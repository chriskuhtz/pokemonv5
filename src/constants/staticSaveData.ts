import { v4 } from 'uuid';
import { EmptyInventory } from '../interfaces/Inventory';
import { SaveFile } from '../interfaces/SaveFile';

export const staticSaveData: SaveFile = {
	playerId: v4(),
	username: 'generic username',
	position: {
		x: 0,
		y: 1,
		forwardFoot: 0,
		mapId: 'oaks-lab',
		orientation: 0,
	},
	lastHealPosition: {
		x: 0,
		y: 1,
		forwardFoot: 0,
		mapId: 'oaks-lab',
		orientation: 0,
	},
	sprite: '135',
	quests: {
		pickStarter: 'inactive',
		talkToNurseJoy: 'inactive',
		findPikachu: 'inactive',
		secondPokemon: 'inactive',
		catchAllStarterTown: 'inactive',
		catchAllBerryPatch: 'inactive',
		catchAllFlamingDesert: 'inactive',
		defeatAllTrainers: 'inactive',
	},
	handledOccupants: {
		'youngster-jimmy': false,
		'starter-town-item-1': false,
		'starter-town-item-2': false,
		ballMachine: false,
		'starter-town-merchant': false,
		'starter-town-nurse-quest': false,
		'starter-town-nurse': false,
		'oak-after-selection': false,
		'oak-before-selection': false,
		'oak-during-selection': false,
		'youngster-jimmy-blocker': false,
		brock: false,
		'brocks-minion': false,
		'brocks-minion2': false,
		'oaks-assistant': false,
		'oaks-assistant2': false,
		'pikachu-fan': false,
		'bugCatcher-barry': false,
		'bugCatcher-cisco': false,
		'bugCatcher-nash': false,
		'bugCatcher-ralph': false,
		'berry-patch-item-1': false,
		'ace-trainer-melanie': false,
		'cowgirl-alex': false,
		'farmer-pike': false,
		'flaming-desert-item-1': false,
		'flaming-desert-item-2': false,
		'flaming-desert-item-3': false,
		'flaming-desert-item-4': false,
		'flaming-desert-merchant': false,
		'hiker-bennet': false,
		'pyromaniac-javi': false,
	},
	pokedex: [],
	pokemon: [],
	money: 5000,
	inventory: EmptyInventory,
	gymBadges: { boulderBadge: false },
	config: {
		randomStarters: false,
	},
};
