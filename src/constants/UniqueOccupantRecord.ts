import { Occupant } from '../screens/OverworldScreen/interfaces/Occupants/Occupant';

//every occupant that can be handled should be unique
export type UniqueOccupantIds =
	| 'starter-town-oak-before-selection'
	| 'starter-town-oak-during-selection'
	| 'starter-town-oak-after-selection'
	| 'starter-town-nurse-quest'
	| 'starter-town-merchant'
	| 'starter-town-nurse'
	| 'starter-town-ballMachine'
	| 'starter-town-grass-blocker';

export const UniqueOccupantRecord: Record<UniqueOccupantIds, Occupant> = {
	'starter-town-oak-before-selection': {
		id: 'starter-town-oak-before-selection',
		type: 'NPC',
		position: {
			y: 2,
			x: 4,
			mapId: 'starter-town',
			orientation: 0,
		},
		dialogue: [
			'Hello',
			"It's nice to meet you.",
			'Congratulations on obtaining your Pokemon Trainer License.',
			'It is my privilege and responsibility to give you your first Pokemon.',
			'For your first Pokemon Partner, you can choose one from the Machine next to me.',
		],
		sprite: '136',
		questUpdates: {
			talkToNurseJoy: 'active',
			pickStarter: 'active',
		},
		questCondition: { id: 'pickStarter', status: 'inactive' },
	},
	'starter-town-oak-during-selection': {
		id: 'starter-town-oak-during-selection',
		type: 'NPC',
		position: {
			y: 2,
			x: 4,
			mapId: 'starter-town',
			orientation: 0,
		},
		dialogue: [
			'Choosing the right Pokemon Partner is important',
			'Consider your choices carefully',
		],
		sprite: '136',
		questCondition: { id: 'pickStarter', status: 'active' },
	},
	'starter-town-oak-after-selection': {
		id: 'starter-town-oak-after-selection',
		type: 'NPC',
		position: {
			y: 2,
			x: 4,
			mapId: 'starter-town',
			orientation: 0,
		},
		dialogue: [
			'Aah, what an excellent choice',
			'I am sure this Pokemon will become an excellent Partner',
			'I look forward to hearing about your many adventures',
		],
		sprite: '136',
		questCondition: {
			id: 'pickStarter',
			status: 'completed',
		},
	},
	'starter-town-nurse-quest': {
		id: 'starter-town-nurse-quest',
		type: 'NPC',
		position: {
			y: 5,
			x: 8,
			mapId: 'starter-town',
			orientation: 0,
		},
		dialogue: [
			'Welcome to the world of Pokemon',
			'Please visit me any time your Pokemon is hurt',
			'I will also give these potions',
			'Use them for first aid in the field',
		],
		questUpdates: {
			talkToNurseJoy: 'completed',
		},
		sprite: '115',
		questCondition: { id: 'talkToNurseJoy', status: 'active' },
	},
	'starter-town-merchant': {
		id: 'starter-town-merchant',
		type: 'MERCHANT',
		position: {
			y: 4,
			x: 8,
			mapId: 'starter-town',
			orientation: 0,
		},
		inventory: { potion: 100, 'poke-ball': 100, repel: 100 },
		dialogue: ['What do you need?'],
		sprite: '113',
	},
	'starter-town-nurse': {
		id: 'starter-town-nurse',
		type: 'HEALER',
		position: {
			y: 5,
			x: 8,
			mapId: 'starter-town',
			orientation: 0,
		},
		sprite: '115',
		questCondition: { id: 'talkToNurseJoy', status: 'completed' },
	},
	'starter-town-ballMachine': {
		id: 'starter-town-ballMachine',
		type: 'LARGE_OBSTACLE',
		position: {
			y: 2,
			x: 5,
			mapId: 'starter-town',
			orientation: 0,
		},
		sprite: 'pokeballMachine',
		height: 3,
		width: 2,
		clearanceBehind: 1,
		onClick: {
			type: 'ROUTE',
			to: '/starterSelection',
			questCondition: {
				id: 'pickStarter',
				status: 'active',
			},
		},
	},
	'starter-town-grass-blocker': {
		id: 'starter-town-grass-blocker',
		type: 'QUEST_CHECK',
		position: {
			y: 8,
			x: 4,
			mapId: 'starter-town',
			orientation: 0,
		},
		questCheck: {
			id: 'pickStarter',
			status: 'completed',
		},
	},
};
