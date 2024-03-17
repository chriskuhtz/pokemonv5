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
		y: 25,
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

export const nightPokemonFan: Npc = {
	id: 'night-pokemon-fan',
	type: 'NPC',
	position: {
		y: 5,
		x: 0,
		mapId: 'starter-town',
		orientation: 2,
	},
	dialogue: [
		'Did you know that Pokemon prefer different times of day?',
		'Some only show up at night',
	],
	sprite: SpriteEnum.mechanic,
	questUpdates: {
		catchNightPokemon: 'active',
	},
};

export const OakBeforeSelection: Npc = {
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
		'But first, there are some things for you to decide.',
	],
	sprite: '136',
	questUpdates: {
		talkToNurseJoy: 'active',
		pickStarter: 'active',
	},
	onDialogueEnd: { type: 'ROUTE', to: '/playerConfig' },
	questCondition: { id: 'pickStarter', status: 'inactive' },
};
export const OakDuringSelection: Npc = {
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
};
export const OakAfterSelection: Npc = {
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
};
