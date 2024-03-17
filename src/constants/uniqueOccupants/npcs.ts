import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Npc } from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

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

export const oaksAssistant: Npc = {
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
};
export const oaksAssistant2: Npc = {
	id: 'oaks-assistant2',
	type: 'NPC',
	position: {
		y: 24,
		x: 1,
		mapId: 'starter-town',
		orientation: 3,
	},
	dialogue: [
		'You should learn more about the local Pokemon before continuing further',
	],
	sprite: SpriteEnum.scientistMale,
	questCondition: {
		id: 'catchAllStarterTown',
		status: 'active',
	},
};

export const pikachuFan: Npc = {
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
};
