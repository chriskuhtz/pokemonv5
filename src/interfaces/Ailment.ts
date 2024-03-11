export interface PrimaryAilment {
	type: 'paralysis' | 'burn' | 'freeze';
}

export function isPrimaryAilment(x: { type: string }): x is PrimaryAilment {
	return ['paralysis', 'burn', 'freeze'].includes(x.type);
}
export function isSecondaryAilment(x: { type: string }): x is SecondaryAilment {
	return ['confusion', 'trap'].includes(x.type);
}
export interface SecondaryAilment {
	type: 'confusion' | 'trap';
	duration: number;
}

export const PARA_CHANCE = 0.25;
export const PARA_SPEED_FACTOR = 0.5;
export const BURN_DAMAGE_FACTOR = 1 / 8;
export const BURN_ATTACK_REDUCTION_FACTOR = 0.5;
export const SANDSTORM_DAMAGE_FACTOR = 1 / 16;
export const UNFREEZE_CHANCE = 0.2;
export const TRAP_DAMAGE_FACTOR = 1 / 8;
