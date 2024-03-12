import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokeballType } from '../interfaces/Inventory';
import { calculateLevelData } from './calculateLevelData';

export const determineCatchRate = (
	ball: PokeballType,
	target: BattlePokemon
) => {
	let ballfactor = 0;
	if (ball === 'master-ball') {
		ballfactor = 1;
	}
	if (ball === 'poke-ball') {
		ballfactor = 0.125;
	}

	const healthfactor = target.stats.hp - target.damage / target.stats.hp;
	const { level } = calculateLevelData(target.xp);
	const levelFactor = (100 - level) / 100;

	return ballfactor + healthfactor * levelFactor * ballfactor;
};
