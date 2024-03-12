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
	},
	dialogue: ['What do you need?'],
	sprite: '113',
};
