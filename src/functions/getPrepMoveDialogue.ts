export const getPrepMoveDialogue = (name: string, moveName: string): string => {
	if (moveName === 'razor-wind') {
		return `${name} is glowing`;
	}
	if (moveName === 'skull-bash') {
		return `${name} tucked its head`;
	}
	if (moveName === 'solar-beam') {
		return `${name} is absorbing sunlight`;
	}
	if (moveName === 'fly') {
		return `${name} flew into the sky`;
	}
	if (moveName === 'dive') {
		return `${name} dove underwater`;
	}
	if (moveName === 'bounce') {
		return `${name} jumps into the air`;
	}
	return `${name} is preparing ${moveName}`;
};
