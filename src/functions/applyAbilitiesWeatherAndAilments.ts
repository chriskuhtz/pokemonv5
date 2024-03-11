import { Dispatch } from 'react';
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
) => {
	if (!isPrimaryAction(actor.nextAction)) {
		return;
	}
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
		dispatch(addNotification(`${actor.name} took damage from the sand storm`));
		updatedActor = {
			...updatedActor,
			damage: updatedActor.damage + Math.round(updatedActor.stats.hp / 16),
		};
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
};
