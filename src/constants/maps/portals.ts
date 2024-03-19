import { Decorator } from '../../screens/OverworldScreen/interfaces/Decorator';

//FROM OAKS LAB
export const oaksLabToStarterTown: Decorator = {
	sprite: 'doormat',
	x: 2,
	y: 5,
	onStep: {
		type: 'PORTAL',
		to: { mapId: 'starter-town', x: 5, y: 4, orientation: 0 },
	},
};
//FORM POKEMON CENTER
export const pokeCenterToStarterTown: Decorator = {
	sprite: 'doormat',
	x: 2,
	y: 4,
	onStep: {
		type: 'PORTAL',
		to: { mapId: 'starter-town', x: 1, y: 4, orientation: 0 },
	},
};
//FROM STARTER TOWN
export const starterTownToOaksLab: Decorator = {
	x: 5,
	y: 3,
	sprite: '',
	onStep: {
		type: 'PORTAL',
		to: { orientation: 3, mapId: 'oaks-lab', y: 4, x: 2 },
	},
};
export const starterTownToPokeCenter: Decorator = {
	x: 1,
	y: 3,
	sprite: '',
	onStep: {
		type: 'PORTAL',
		to: { orientation: 3, mapId: 'pokemon-center', y: 4, x: 2 },
	},
};
export const starterTownToBerryPatch: Decorator = {
	sprite: '',
	x: 8,
	y: 9,
	onStep: {
		type: 'PORTAL',
		to: { mapId: 'berry-patch', x: 0, y: 6, orientation: 2 },
	},
};
export const starterTownToBrockLeft: Decorator = {
	x: 5,
	y: 23,
	sprite: '',
	onStep: {
		type: 'PORTAL',
		to: { orientation: 3, mapId: 'brocks-gym', y: 14, x: 4 },
	},
};
export const starterTownToBrockRight: Decorator = {
	x: 6,
	y: 23,
	sprite: '',
	onStep: {
		type: 'PORTAL',
		to: { orientation: 3, mapId: 'brocks-gym', y: 14, x: 4 },
	},
};
export const starterTownToFlamingDesert: Decorator = {
	x: 1,
	y: 25,
	sprite: '',
	onStep: {
		type: 'PORTAL',
		to: { orientation: 2, mapId: 'flaming-desert', y: 5, x: 0 },
	},
};
//FROM BERRY PATCH
export const berryPatchToStarterTown: Decorator = {
	sprite: '',
	x: 0,
	y: 6,
	onStep: {
		type: 'PORTAL',
		to: { mapId: 'starter-town', x: 8, y: 9, orientation: 1 },
	},
};
//FROM BROCKS GYM
export const brocksGymToStarterTown: Decorator = {
	sprite: 'doormat',
	x: 4,
	y: 14,
	onStep: {
		type: 'PORTAL',
		to: { mapId: 'starter-town', x: 5, y: 24, orientation: 0 },
	},
};
//FROM FLAMING DESERT
export const flamingDesertToStarterTown: Decorator = {
	sprite: '',
	x: 0,
	y: 5,
	onStep: {
		type: 'PORTAL',
		to: { mapId: 'starter-town', x: 1, y: 25, orientation: 3 },
	},
};
export const flamingDesertToStarterTown2: Decorator = {
	sprite: '',
	x: 0,
	y: 6,
	onStep: {
		type: 'PORTAL',
		to: { mapId: 'starter-town', x: 1, y: 25, orientation: 3 },
	},
};
