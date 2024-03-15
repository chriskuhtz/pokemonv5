import { BattlePokemon } from '../interfaces/BattlePokemon';
import { UsedPowerPoints } from '../interfaces/OwnedPokemon';

export const applyPPChange = (
	pokemon: BattlePokemon,
	change: number,
	moveIndex: number
): BattlePokemon => {
	const { firstMove, secondMove, thirdMove, fourthMove } =
		pokemon.usedPowerPoints;

	const newUsedPP: UsedPowerPoints = {
		firstMove: Math.max(
			0,
			firstMove + ([-1, 0].includes(moveIndex) ? change : 0)
		),
		secondMove: Math.max(
			0,
			secondMove + ([-1, 1].includes(moveIndex) ? change : 0)
		),
		thirdMove: Math.max(
			0,
			thirdMove + ([-1, 2].includes(moveIndex) ? change : 0)
		),
		fourthMove: Math.max(
			0,
			fourthMove + ([-1, 3].includes(moveIndex) ? change : 0)
		),
	};

	return { ...pokemon, usedPowerPoints: newUsedPP };
};
