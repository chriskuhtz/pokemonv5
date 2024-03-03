import { Stat } from './StatObject';

export type Nature =
	| 'hardy'
	| 'lonely'
	| 'adamant'
	| 'naughty'
	| 'brave'
	| 'bold'
	| 'docile'
	| 'impish'
	| 'lax'
	| 'relaxed'
	| 'modest'
	| 'mild'
	| 'bashful'
	| 'rash'
	| 'quiet'
	| 'calm'
	| 'gentle'
	| 'careful'
	| 'quirky'
	| 'sassy'
	| 'timid'
	| 'hasty'
	| 'jolly'
	| 'naive'
	| 'serious';

export const natures: Record<Nature, { buff?: Stat; debuff?: Stat }> = {
	hardy: {},
	lonely: { buff: 'attack', debuff: 'defence' },
	adamant: { buff: 'attack', debuff: 'spatk' },
	naughty: { buff: 'attack', debuff: 'spdef' },
	brave: { buff: 'attack', debuff: 'speed' },
	bold: { buff: 'defence', debuff: 'attack' },
	docile: {},
	impish: { buff: 'defence', debuff: 'spatk' },
	lax: { buff: 'defence', debuff: 'spdef' },
	relaxed: { buff: 'defence', debuff: 'speed' },
	modest: { buff: 'spatk', debuff: 'attack' },
	mild: { buff: 'spatk', debuff: 'defence' },
	bashful: {},
	rash: { buff: 'spatk', debuff: 'spdef' },
	quiet: { buff: 'spatk', debuff: 'speed' },
	calm: { buff: 'spdef', debuff: 'attack' },
	gentle: { buff: 'spdef', debuff: 'defence' },
	careful: { buff: 'spdef', debuff: 'spatk' },
	quirky: {},
	sassy: { buff: 'spdef', debuff: 'speed' },
	timid: { buff: 'speed', debuff: 'attack' },
	hasty: { buff: 'speed', debuff: 'defence' },
	jolly: { buff: 'speed', debuff: 'spatk' },
	naive: { buff: 'speed', debuff: 'spdef' },
	serious: {},
};

export type NatureFactor = 0.9 | 1 | 1.1;
