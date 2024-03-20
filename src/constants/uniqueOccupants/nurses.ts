import {
	Healer,
	Npc,
} from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

export const pokeCenterNurse: Healer = {
	id: 'starter-town-nurse',
	type: 'HEALER',
	position: {
		y: 1,
		x: 2,
		mapId: 'pokemon-center',
		orientation: 0,
	},
	sprite: '115',
	dialogue: ['Let me heal your Pokemon'],
	questCondition: { id: 'talkToNurseJoy', status: 'active', negate: true },
};

export const pokeCenterNurseQuest: Npc = {
	id: 'starter-town-nurse-quest',
	type: 'NPC',
	position: {
		y: 1,
		x: 2,
		mapId: 'pokemon-center',
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
	},

	sprite: '115',
	questCondition: { id: 'talkToNurseJoy', status: 'active' },
};
