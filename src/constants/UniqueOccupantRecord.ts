import { generateInventory } from '../interfaces/Inventory';
import { SpriteEnum } from '../interfaces/SpriteEnum';
import {
	Npc,
	Occupant,
} from '../screens/OverworldScreen/interfaces/Occupants/Occupant';
import {
	brock,
	brocksMinion,
	brocksMinion2,
	bugcatcherBarry,
	bugcatcherCisco,
	bugcatcherNash,
	bugcatcherRalph,
	youngsterJimmy,
} from './trainers';

//every occupant that can be handled should be unique
export type UniqueOccupantIds =
	| 'oak-before-selection'
	| 'oak-during-selection'
	| 'oak-after-selection'
	| 'starter-town-nurse-quest'
	| 'starter-town-merchant'
	| 'starter-town-nurse'
	| 'ballMachine'
	| 'starter-town-grass-blocker'
	| 'starter-town-item-1'
	| 'youngster-jimmy'
	| 'brock'
	| 'brocks-minion'
	| 'brocks-minion2'
	| 'youngster-jimmy-blocker'
	| 'oaks-assistant'
	| 'pikachu-fan'
	| 'bugCatcher-barry'
	| 'bugCatcher-nash'
	| 'bugCatcher-ralph'
	| 'bugCatcher-cisco';

export const youngsterJimmyBlocker: Npc = {
	id: 'youngster-jimmy-blocker',
	type: 'NPC',
	position: {
		y: 8,
		x: 4,
		mapId: 'starter-town',
		orientation: 3,
	},
	dialogue: [
		'You should talk to the Professor and Nurse Joy before heading into the wilderness',
	],
	sprite: '093',
	questCondition: {
		id: 'talkToNurseJoy',
		status: 'completed',
		negate: true,
	},
};

export const UniqueOccupantRecord: Record<UniqueOccupantIds, Occupant> = {
	'youngster-jimmy': youngsterJimmy,
	'youngster-jimmy-blocker': youngsterJimmyBlocker,
	brock,
	'brocks-minion': brocksMinion,
	'brocks-minion2': brocksMinion2,
	'starter-town-item-1': {
		id: 'starter-town-item-1',
		type: 'ITEM',
		inventory: generateInventory({ repel: 7 }),
		position: {
			y: 7,
			x: 0,
			mapId: 'starter-town',
			orientation: 0,
		},
	},
	'oak-before-selection': {
		id: 'oak-before-selection',
		type: 'NPC',
		position: {
			y: 2,
			x: 2,
			mapId: 'oaks-lab',
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
	'oak-during-selection': {
		id: 'oak-during-selection',
		type: 'NPC',
		position: {
			y: 2,
			x: 2,
			mapId: 'oaks-lab',
			orientation: 0,
		},
		dialogue: [
			'Choosing the right Pokemon Partner is important',
			'Consider your choices carefully',
		],
		sprite: '136',
		questCondition: { id: 'pickStarter', status: 'active' },
	},
	'oak-after-selection': {
		id: 'oak-after-selection',
		type: 'NPC',
		position: {
			y: 2,
			x: 2,
			mapId: 'oaks-lab',
			orientation: 0,
		},
		dialogue: [
			'Aah, what an excellent choice',
			'I am sure this Pokemon will become an excellent Partner',
			'I look forward to hearing about your many adventures',
			'You should talk to Nurse Joy outside',
			'She will provide you with some starting equipment',
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
			secondPokemon: 'active',
			catchAllStarterTown: 'active',
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
		inventory: {
			potion: 1000,
			'poke-ball': 1000,
			repel: 1000,
			'great-ball': 1000,
			'ultra-ball': 1000,
		},
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
		dialogue: ['Let me heal your Pokemon'],
		questCondition: { id: 'talkToNurseJoy', status: 'completed' },
	},
	ballMachine: {
		id: 'ballMachine',
		type: 'LARGE_OBSTACLE',
		position: {
			y: 2,
			x: 3,
			mapId: 'oaks-lab',
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
			conditionFailMessage: ['You should speak to the Professor first.'],
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
		questCondition: {
			id: 'talkToNurseJoy',
			status: 'completed',
		},
	},
	'oaks-assistant': {
		id: 'oaks-assistant',
		type: 'NPC',
		position: {
			y: 24,
			x: 3,
			mapId: 'starter-town',
			orientation: 1,
		},
		dialogue: [
			'If you want to challenge Brock, you should have at least two pokemon',
		],
		sprite: SpriteEnum.scientistFemale,
		questCondition: { id: 'secondPokemon', status: 'active' },
	},
	'pikachu-fan': {
		id: 'pikachu-fan',
		type: 'NPC',
		position: {
			y: 17,
			x: 0,
			mapId: 'starter-town',
			orientation: 2,
		},
		dialogue: ['Do you have a Pikachu?', 'Its the bees knees'],
		sprite: SpriteEnum.child,
		questUpdates: {
			findPikachu: 'active',
		},
	},
	'bugCatcher-barry': bugcatcherBarry,
	'bugCatcher-cisco': bugcatcherCisco,
	'bugCatcher-nash': bugcatcherNash,
	'bugCatcher-ralph': bugcatcherRalph,
};
