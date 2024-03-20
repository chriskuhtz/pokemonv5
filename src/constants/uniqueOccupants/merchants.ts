import { Merchant } from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

export const starterTownMerchant: Merchant = {
	id: 'starter-town-merchant',
	type: 'MERCHANT',
	position: {
		y: 4,
		x: 8,
		mapId: 'starter-town',
		orientation: 0,
	},
	inventory: {
		potion: 1000,
		'poke-ball': 1000,
		antidote: 1000,
		'burn-heal': 1000,
		'paralyze-heal': 1000,
		awakening: 1000,
		'ice-heal': 1000,
		revive: 1000,
		'super-potion': 1000,
	},
	dialogue: ['What do you need?'],
	sprite: '113',
};

export const flamingDesertMerchant: Merchant = {
	id: 'flaming-desert-merchant',
	type: 'MERCHANT',
	position: {
		y: 10,
		x: 15,
		mapId: 'flaming-desert',
		orientation: 3,
	},
	inventory: {
		'berry-juice': 1000,
		'fresh-water': 1000,
		'lava-cookie': 1000,
		'moomoo-milk': 1000,
		'blue-flute': 1000,
		'yellow-flute': 1000,
		'white-flute': 1000,
		'black-flute': 1000,
	},
	dialogue: ['Nothing is more hydrating than a fresh berry juice!'],
	sprite: '077',
};
