import { SpriteEnum } from '../interfaces/SpriteEnum';
import { Trainer } from '../screens/OverworldScreen/interfaces/Occupants/Occupant';

export const brock: Trainer = {
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
		'Take this Boulder Badge as a sign of your victory.',
	],
	sprite: SpriteEnum['brock'],
	team: [{ dexId: 95, xp: 1000 }],
	activePokemonPerside: 1,
	rewardMoney: 4000,
	rewardBadge: 'boulderBadge',
};
export const youngsterJimmy: Trainer = {
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
};

export const brocksMinion: Trainer = {
	id: 'brocks-minion',
	type: 'TRAINER',
	position: {
		y: 3,
		x: 6,
		mapId: 'brocks-gym',
		orientation: 1,
	},
	dialogue: ['Go, my Rock Pokemon!'],
	dialogueAfterDefeat: ['Damn, you are too good!'],
	sprite: '093',
	team: [
		{ dexId: 524, xp: 400 },
		{ dexId: 299, xp: 400 },
	],
	activePokemonPerside: 2,
	rewardMoney: 500,
	viewRange: 2,
};
