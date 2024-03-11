export interface PrimaryAilment {
	type: 'paralysis' | 'burn' | 'freeze';
}

export function isPrimaryAilment(x: { type: string }): x is PrimaryAilment {
	return ['paralysis', 'burn', 'freeze'].includes(x.type);
}

export interface SecondaryAilment {
	type: 'confusion';
}

export const PARA_CHANCE = 0.25;
export const BURN_DAMAGE_FACTOR = 1 / 8;
export const SANDSTORM_DAMAGE_FACTOR = 1 / 16;
export const UNFREEZE_CHANCE = 0.2;
