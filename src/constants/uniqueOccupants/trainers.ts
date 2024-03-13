import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Trainer } from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

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
	team: [
		{
			dexId: 95,
			xp: 3000,
			customMoves: ['earthquake', 'bounce', 'rock-slide', 'body-slam'],
		},
	],
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
	questUpdates: {
		defeatAllTrainers: 'active',
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
		{ dexId: 299, xp: 700 },
	],
	activePokemonPerside: 2,
	rewardMoney: 500,
	viewRange: 2,
};
export const brocksMinion2: Trainer = {
	id: 'brocks-minion2',
	type: 'TRAINER',
	position: {
		y: 5,
		x: 3,
		mapId: 'brocks-gym',
		orientation: 2,
	},
	dialogue: ['Lets see how tough you are!'],
	dialogueAfterDefeat: ['Tougher than me!'],
	sprite: SpriteEnum.youngster2,
	team: [
		{
			dexId: 744,
			xp: 1000,
			customMoves: ['accelerock', 'swords-dance', 'accelerock', 'swords-dance'],
		},
	],
	activePokemonPerside: 1,
	rewardMoney: 500,
	viewRange: 3,
};

export const bugcatcherBarry: Trainer = {
	id: 'bugcatcher-barry',
	type: 'TRAINER',
	position: {
		y: 4,
		x: 3,
		mapId: 'berry-patch',
		orientation: 2,
	},
	dialogue: ['Bugs, Bugs, BUGS', 'BUUUUUGS'],
	dialogueAfterDefeat: ['bugs ...'],
	sprite: SpriteEnum.bugCatcher,
	team: [{ dexId: 48, xp: 300 }],
	activePokemonPerside: 1,
	rewardMoney: 500,
	viewRange: 1,
};
export const bugcatcherCisco: Trainer = {
	id: 'bugcatcher-cisco',
	type: 'TRAINER',
	position: {
		y: 7,
		x: 4,
		mapId: 'berry-patch',
		orientation: 0,
	},
	dialogue: ['Bug Pokemon are the coolest'],
	dialogueAfterDefeat: ['Maybe other types are also cool'],
	sprite: SpriteEnum.bugCatcherTan,
	team: [
		{ dexId: 165, xp: 100 },
		{ dexId: 165, xp: 200 },
		{ dexId: 165, xp: 300 },
	],
	activePokemonPerside: 1,
	rewardMoney: 500,
	viewRange: 1,
};
export const bugcatcherRalph: Trainer = {
	id: 'bugcatcher-ralph',
	type: 'TRAINER',
	position: {
		y: 2,
		x: 8,
		mapId: 'berry-patch',
		orientation: 0,
	},
	dialogue: ['Dont bug me', 'Hah, get it?'],
	dialogueAfterDefeat: ['Bugger off'],
	sprite: SpriteEnum.bugCatcherTan,
	team: [
		{ dexId: 401, xp: 100 },
		{ dexId: 402, xp: 300 },
	],
	activePokemonPerside: 2,
	rewardMoney: 500,
	viewRange: 3,
};
export const bugcatcherNash: Trainer = {
	id: 'bugcatcher-nash',
	type: 'TRAINER',
	position: {
		y: 9,
		x: 6,
		mapId: 'berry-patch',
		orientation: 3,
	},
	dialogue: ['Bugs evolve really quickly'],
	dialogueAfterDefeat: ['But they dont get much stronger'],
	sprite: SpriteEnum.bugCatcher,
	team: [
		{ dexId: 10, xp: 100 },
		{ dexId: 11, xp: 200 },
		{ dexId: 12, xp: 400 },
	],
	activePokemonPerside: 1,
	rewardMoney: 500,
	viewRange: 2,
};
