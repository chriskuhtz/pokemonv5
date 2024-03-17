import { Dispatch } from 'react';
import {
	BURN_DAMAGE_FACTOR,
	CONFUSION_HURT_CHANCE,
	PARA_CHANCE,
	POISON_DAMAGE_FACTOR,
	SANDSTORM_DAMAGE_FACTOR,
	TRAP_DAMAGE_FACTOR,
	UNFREEZE_CHANCE,
	WAKEUP_CHANCE,
} from '../interfaces/Ailment';
import { isPrimaryAction } from '../interfaces/BattleAction';
import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { BattleSide } from '../screens/BattleScreen/BattleScreen';
import { addNotification } from '../store/slices/notificationSlice';
import { calculateDamage } from './calculateDamage';
import { canRaiseStat } from './canRaiseStat';
import { consumeHeldItem } from './consumeHeldItem';
import { getDamageFactors } from './getDamageFactors';
import { reduceDuration } from './reduceDuration';

export const applyAbilitiesWeatherAilmentsAndHeldItems = (
	actor: BattlePokemon,
	playerSide: BattleSide,
	opponentSide: BattleSide,
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setEnvironment: React.Dispatch<React.SetStateAction<BattleEnvironment>>,
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
	//DRIZZLE
	if (
		actor.ability === 'drizzle' &&
		environment.weather?.type !== 'rain' &&
		!actor.usedAbility
	) {
		dispatch(addNotification(`${actor.name} caused a rainstorm`));
		setEnvironment({ ...environment, weather: { type: 'rain', duration: -1 } });
		updatedActor = {
			...updatedActor,
			usedAbility: true,
		};
	}
	//CLOUD_NINE
	if (
		actor.ability === 'cloud-nine' &&
		environment.weather &&
		!actor.usedAbility
	) {
		dispatch(
			addNotification(`${actor.name} calmed the weather with cloud nine`)
		);
		setEnvironment({ ...environment, weather: undefined });
		updatedActor = {
			...updatedActor,
			usedAbility: true,
		};
	}
	//SAND VEIL
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
		if (Math.random() >= UNFREEZE_CHANCE) {
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
	//SLEEP
	if (updatedActor.primaryAilment?.type === 'sleep') {
		if (Math.random() >= WAKEUP_CHANCE) {
			dispatch(addNotification(`${actor.name} is fast asleep`));
			shouldSkip = true;
			updatedActor = {
				...updatedActor,
				nextAction: undefined,
			};
		} else {
			dispatch(addNotification(`${actor.name} woke up`));
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
	//DISABLE
	if (updatedActor.disabledMove) {
		const reducedDuration = reduceDuration(updatedActor.disabledMove.duration);
		if (!reducedDuration) {
			dispatch(
				addNotification(
					`${actor.name}'s ${updatedActor.disabledMove} is no longer disabled`
				)
			);

			updatedActor = {
				...updatedActor,
				disabledMove: undefined,
			};
		} else {
			dispatch(
				addNotification(
					`${actor.name}'s ${updatedActor.disabledMove} is disabled`
				)
			);
			shouldSkip = true;
			updatedActor = {
				...updatedActor,
				disabledMove: {
					...updatedActor.disabledMove,
					duration: reducedDuration,
				},
				nextAction: undefined,
			};
		}
	}
	if (updatedActor.heldItemName) {
		updatedActor = consumeHeldItem(updatedActor, dispatch);
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
