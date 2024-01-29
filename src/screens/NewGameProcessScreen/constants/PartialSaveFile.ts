import { v4 } from 'uuid';
import { SaveFile } from '../../../interfaces/SaveFile';

export const PARTIAL_SAVE_FILE: Omit<SaveFile, 'username' | 'sprite'> = {
	overworldPosition: {
		position: { x: 0, y: 0 },
		orientation: 'Down',
		currentMapId: 'starter-town',
	},
	id: v4(),
	handledOccupants: {
		'starter-town-ballMachine': false,
		'starter-town-merchant': false,
		'starter-town-nurse': false,
		'starter-town-nurse-quest': false,
		'starter-town-oak-after-selection': false,
		'starter-town-oak-before-selection': false,
		'starter-town-oak-during-selection': false,
	},
	money: 5000,
	inventory: {
		potion: 0,
		repel: 0,
		'poke-ball': 0,
	},
	pokemon: [],
	pokedex: [],
	quests: {
		pickStarter: 'inactive',
		talkToNurseJoy: 'inactive',
	},
};
