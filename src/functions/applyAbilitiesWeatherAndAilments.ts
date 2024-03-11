import { Dispatch } from 'react';
import {
	BURN_DAMAGE_FACTOR,
	PARA_CHANCE,
	SANDSTORM_DAMAGE_FACTOR,
} from '../interfaces/Ailment';
import { isPrimaryAction } from '../interfaces/BattleAction';
import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleSide } from '../screens/BattleScreen/BattleScreen';
import { addNotification } from '../store/slices/notificationSlice';
import { canRaiseStat } from './canRaiseStat';

export const applyAbilitiesWeatherAndAilments = (
	actor: BattlePokemon,
	playerSide: BattleSide,
	opponentSide: BattleSide,
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	dispatch: Dispatch<unknown>,
	environment: BattleEnvironment
): boolean => {
	if (!isPrimaryAction(actor.nextAction)) {
		return false;
	}
	let shouldSkip = false;
	let updatedActor = { ...actor };
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
	if (updatedActor.primaryAilment?.type === 'burn') {
		dispatch(addNotification(`${actor.name} is hurt by burn`));
		updatedActor = {
			...updatedActor,
			damage:
				updatedActor.damage +
				Math.round(updatedActor.stats.hp * BURN_DAMAGE_FACTOR),
		};
	}
	if (
		updatedActor.primaryAilment?.type === 'paralysis' &&
		Math.random() < PARA_CHANCE
	) {
		dispatch(addNotification(`${actor.name} is paralyzed`));
		shouldSkip = true;
		updatedActor = {
			...updatedActor,
			nextAction: undefined,
		};
	}
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
