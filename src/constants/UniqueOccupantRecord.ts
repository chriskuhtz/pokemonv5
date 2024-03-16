import { Occupant } from '../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { starterTownMerchant } from './uniqueOccupants/merchants';
import {
	oaksAssistant,
	oaksAssistant2,
	pikachuFan,
	youngsterJimmyBlocker,
} from './uniqueOccupants/npcs';
import {
	berryPatchItem1,
	starterTownItem1,
	starterTownItem2,
} from './uniqueOccupants/overworldItems';
import {
	brock,
	brocksMinion,
	brocksMinion2,
	bugcatcherBarry,
	bugcatcherCisco,
	bugcatcherNash,
	bugcatcherRalph,
	youngsterJimmy,
} from './uniqueOccupants/trainers';

//every occupant that can be handled should be unique
export type UniqueOccupantIds =
	| 'oak-before-selection'
	| 'oak-during-selection'
	| 'oak-after-selection'
	| 'starter-town-nurse-quest'
	| 'starter-town-merchant'
	| 'starter-town-nurse'
	| 'ballMachine'
	| 'starter-town-item-1'
	| 'starter-town-item-2'
	| 'youngster-jimmy'
	| 'brock'
	| 'brocks-minion'
	| 'brocks-minion2'
	| 'youngster-jimmy-blocker'
	| 'oaks-assistant'
	| 'oaks-assistant2'
	| 'pikachu-fan'
	| 'bugCatcher-barry'
	| 'bugCatcher-nash'
	| 'bugCatcher-ralph'
	| 'bugCatcher-cisco'
	| 'berry-patch-item-1';

export const UniqueOccupantRecord: Record<UniqueOccupantIds, Occupant> = {
	'youngster-jimmy': youngsterJimmy,
	'youngster-jimmy-blocker': youngsterJimmyBlocker,
	brock,
	'brocks-minion': brocksMinion,
	'brocks-minion2': brocksMinion2,
	'starter-town-item-1': starterTownItem1,
	'starter-town-item-2': starterTownItem2,
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
			catchAllBerryPatch: 'active',
			catchAllFlamingDesert: 'active',
		},
		sprite: '115',
		questCondition: { id: 'talkToNurseJoy', status: 'active' },
	},
	'starter-town-merchant': starterTownMerchant,
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
	'oaks-assistant': oaksAssistant,
	'oaks-assistant2': oaksAssistant2,
	'pikachu-fan': pikachuFan,
	'bugCatcher-barry': bugcatcherBarry,
	'bugCatcher-cisco': bugcatcherCisco,
	'bugCatcher-nash': bugcatcherNash,
	'bugCatcher-ralph': bugcatcherRalph,
	'berry-patch-item-1': berryPatchItem1,
};
