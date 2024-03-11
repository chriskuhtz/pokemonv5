export interface PrimaryAilment {
	type: 'paralysis' | 'burn';
}

export function isPrimaryAilment(x: { type: string }): x is PrimaryAilment {
	return ['paralysis', 'burn'].includes(x.type);
}

export interface SecondaryAilment {
	type: 'confusion';
}
