import { Dispatch } from 'react';
import {
	BURN_DAMAGE_FACTOR,
	CONFUSION_HURT_CHANCE,
	PARA_CHANCE,
	POISON_DAMAGE_FACTOR,
	SANDSTORM_DAMAGE_FACTOR,
	TRAP_DAMAGE_FACTOR,
} from '../interfaces/Ailment';
import { isPrimaryAction } from '../interfaces/BattleAction';
import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { BattleSide } from '../screens/BattleScreen/BattleScreen';
import { addNotification } from '../store/slices/notificationSlice';
import { calculateDamage } from './calculateDamage';
import { canRaiseStat } from './canRaiseStat';
import { getDamageFactors } from './getDamageFactors';

export const applyAbilitiesWeatherAndAilments = (
	actor: BattlePokemon,
	playerSide: BattleSide,
	opponentSide: BattleSide,
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	dispatch: Dispatch<unknown>,
	environment: BattleEnvironment
): boolean => {
	if (!isPrimaryAction(actor.nextAction) && !actor.multiHits) {
		return false;
	}
	let shouldSkip = false;
	let updatedActor = { ...actor };
	//SPEED BOOST
	if (actor.ability === 'speed-boost' && canRaiseStat(actor, 'speed')) {
		dispatch(
			addNotification(`${actor.name} increased its speed with speed-boost`)
		);
		updatedActor = {
			...updatedActor,
			statModifiers: {
				...updatedActor.statModifiers,
				speed: updatedActor.statModifiers.speed + 1,
			},
		};
	}
	//SAND STORM
	if (
		environment.weather?.type === 'sandstorm' &&
		actor.ability !== 'sand-veil'
	) {
		dispatch(addNotification(`${actor.name} is hurt by the sand storm`));
		updatedActor = {
			...updatedActor,
			damage:
				updatedActor.damage +
				Math.round(updatedActor.stats.hp * SANDSTORM_DAMAGE_FACTOR),
		};
	}
	//BURN
	if (updatedActor.primaryAilment?.type === 'burn') {
		dispatch(addNotification(`${actor.name} is hurt by burn`));
		updatedActor = {
			...updatedActor,
			damage:
				updatedActor.damage +
				Math.round(updatedActor.stats.hp * BURN_DAMAGE_FACTOR),
		};
	}
	//POISON
	if (
		updatedActor.primaryAilment?.type === 'poison' ||
		updatedActor.primaryAilment?.type === 'toxic'
	) {
		dispatch(addNotification(`${actor.name} is hurt by poison`));
		updatedActor = {
			...updatedActor,
			damage:
				updatedActor.damage +
				//TODO: implement toxic damage scale
				Math.round(updatedActor.stats.hp * POISON_DAMAGE_FACTOR),
		};
	}
	//PARA
	if (
		updatedActor.primaryAilment?.type === 'paralysis' &&
		Math.random() < PARA_CHANCE
	) {
		dispatch(addNotification(`${actor.name} is fully paralyzed`));
		shouldSkip = true;
		updatedActor = {
			...updatedActor,
			nextAction: undefined,
		};
	}
	//FREEZE
	if (updatedActor.primaryAilment?.type === 'freeze') {
		const random = Math.random();
		if (Math.random() >= random) {
			dispatch(addNotification(`${actor.name} frozen solid`));
			shouldSkip = true;
			updatedActor = {
				...updatedActor,
				nextAction: undefined,
			};
		} else {
			dispatch(addNotification(`${actor.name} was defrosted`));
			updatedActor = {
				...updatedActor,
				primaryAilment: undefined,
			};
		}
	}
	//TRAP
	if (updatedActor.secondaryAilments?.some((a) => a.type === 'trap')) {
		dispatch(addNotification(`${actor.name} is hurt by trap`));
		updatedActor = {
			...updatedActor,
			damage:
				updatedActor.damage +
				Math.round(updatedActor.stats.hp * TRAP_DAMAGE_FACTOR),
		};
	}
	//CONFUSION
	if (
		!shouldSkip &&
		updatedActor.secondaryAilments?.some((a) => a.type === 'confusion')
	) {
		dispatch(addNotification(`${actor.name} is confused`));
		if (Math.random() < CONFUSION_HURT_CHANCE) {
			dispatch(addNotification(`${actor.name} hurt itself in confusion`));
			shouldSkip = true;
			updatedActor = {
				...updatedActor,
				nextAction: undefined,

				damage:
					updatedActor.damage +
					calculateDamage(
						getDamageFactors(
							updatedActor,
							{
								power: 40,
								damage_class: { name: 'physical', url: '' },
								type: { name: 'normal' },
								meta: { crit_rate: -1 },
							} as MoveDto,
							actor,
							{} as BattleEnvironment,
							true
						)
					),
			};
		}
	}

	updatedActor = {
		...updatedActor,
		secondaryAilments: updatedActor.secondaryAilments
			?.map((a) => ({ ...a, duration: a.duration - 1 }))
			.map((a) => {
				if (a.duration === 0) {
					dispatch(
						addNotification(`${updatedActor.name} was freed from ${a.type}`)
					);
				}
				return a;
			})
			.filter((a) => a.duration !== 0),
	};

	if (actor.side === 'PLAYER') {
		setPlayerSide({
			...playerSide,
			field: playerSide.field.map((p) => {
				if (p.id !== actor.id) {
					return p;
				} else return updatedActor;
			}),
		});
	}
	if (actor.side === 'OPPONENT') {
		setOpponentSide({
			...opponentSide,
			field: opponentSide.field.map((p) => {
				if (p.id !== actor.id) {
					return p;
				} else return updatedActor;
			}),
		});
	}
	return shouldSkip;
};
