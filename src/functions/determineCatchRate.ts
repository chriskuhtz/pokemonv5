import { isBattleAttack } from '../interfaces/BattleAction';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokeballType } from '../interfaces/Inventory';
import { calculateLevelData } from './calculateLevelData';
import { inferLocationFromMove } from './inferLocationFromMove';
import { isNight } from './isNight';

// 'quick-ball',

export const determineCatchRate = (
	ball: PokeballType,
	target: BattlePokemon,
	battleRounds: number,
	isCave?: boolean,
	caughtBefore?: boolean
) => {
	const { level } = calculateLevelData(target.xp);
	const targetTypes = [
		target.primaryType,
		target.secondaryType ?? target.primaryType,
	];

	let ballfactor = 0.125; // base: poke-ball, luxury-ball, heal-ball, cherish-ball
	if (ball === 'master-ball') {
		ballfactor = 1;
	}
	if (ball === 'ultra-ball' || ball === 'safari-ball') {
		ballfactor = 0.5;
	}
	if (ball === 'great-ball') {
		ballfactor = 0.25;
	}

	if (
		ball === 'net-ball' &&
		(targetTypes.includes('bug') || targetTypes.includes('water'))
	) {
		ballfactor = 0.875;
	}
	if (
		ball === 'dive-ball' &&
		isBattleAttack(target.nextAction) &&
		inferLocationFromMove(target.nextAction.move) === 'UNDERWATER'
	) {
		ballfactor = 0.875;
	}
	if (ball === 'nest-ball') {
		ballfactor = 0.125 + 0.025 * Math.max(0, 30 - level);
	}
	if (ball === 'repeat-ball' && caughtBefore) {
		ballfactor = 0.875;
	}
	if (ball === 'timer-ball') {
		ballfactor = 0.125 + 0.005 * battleRounds;
	}
	if (ball === 'quick-ball' && battleRounds === 1) {
		ballfactor = 0.875;
	}
	if (ball === 'dusk-ball' && (isCave || isNight())) {
		ballfactor = 0.875;
	}

	//lower health, better chance
	const healthfactor =
		1 + (0.5 * (target.stats.hp - target.damage)) / target.stats.hp;

	//lower level, better chance
	const levelFactor = (100 - level) / 100;

	const catchRate = ballfactor + healthfactor * levelFactor * ballfactor;

	return catchRate;
};
