import { generateInventory } from '../interfaces/Inventory';
import { SpriteEnum } from '../interfaces/SpriteEnum';
import { Occupant } from '../screens/OverworldScreen/interfaces/Occupants/Occupant';

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
	| 'youngster-jimmy-blocker';

export const UniqueOccupantRecord: Record<UniqueOccupantIds, Occupant> = {
	'youngster-jimmy': {
		id: 'youngster-jimmy',
		type: 'TRAINER',
		position: {
			y: 7,
			x: 3,
			mapId: 'starter-town',
			orientation: 2,
		},
		dialogue: ['Think you got what it takes, Big Dog?'],
		dialogueAfterDefeat: [
			'You definitely got it, Large Canine.',
			'Maybe you could even beat Brock.',
		],
		sprite: '093',
		team: [
			{ dexId: 399, xp: 40 },
			{ dexId: 13, xp: 40 },
		],
		activePokemonPerside: 1,
		questCondition: {
			id: 'talkToNurseJoy',
			status: 'completed',
		},
		rewardMoney: 300,
		viewRange: 1,
	},
	'youngster-jimmy-blocker': {
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
	},
	brock: {
		id: 'brock',
		type: 'TRAINER',
		position: {
			y: 1,
			x: 4,
			mapId: 'brocks-gym',
			orientation: 0,
		},
		dialogue: [
			'I am Brock, the Gym Leader of this area.',
			'My speciality are Rock Pokemon.',
			'As Gym Leader, it is my responsibility to test the new trainers that come through here.',
			'Should you defeat me, i will award you the Rock Badge.',
			'Badges are a sign of your skill as a Pokemon trainer.',
			'You should travel far and wide to collect them all.',
			'But first, you need to get past me and Onix!',
		],
		dialogueAfterDefeat: [
			'You have proven yourself worthy.',
			'I wish you good fortune in your travels.',
			'Seek out new experiences and places to grow stronger.',
			'Take this Stone Badge as a sign of your victory.',
		],
		sprite: SpriteEnum['brock'],
		team: [{ dexId: 95, xp: 1000 }],
		activePokemonPerside: 1,
		questCondition: {
			id: 'talkToNurseJoy',
			status: 'completed',
		},
		rewardMoney: 4000,
		rewardBadge: 'stoneBadge',
	},
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
};
