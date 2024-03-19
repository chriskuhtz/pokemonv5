import { SpriteEnum } from '../../interfaces/SpriteEnum';
import { Trainer } from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';
//STARTER_TOWN
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
export const youngsterJohnny: Trainer = {
	id: 'youngster-johnny',
	type: 'TRAINER',
	position: {
		y: 10,
		x: 5,
		mapId: 'starter-town',
		orientation: 1,
	},
	dialogue: ['Pokemon are awesome'],
	dialogueAfterDefeat: ['You are awesome too'],
	sprite: '093',
	team: [{ dexId: 263, xp: 200 }],
	activePokemonPerside: 1,
	rewardMoney: 300,
	viewRange: 1,
	questUpdates: {
		reachLevelFifteen: 'active',
	},
};
export const youngsterTimmy: Trainer = {
	id: 'youngster-timmy',
	type: 'TRAINER',
	position: {
		y: 12,
		x: 3,
		mapId: 'starter-town',
		orientation: 2,
	},
	dialogue: ['My Spearow will show you who´s the boss'],
	dialogueAfterDefeat: ['That worked well ...'],
	sprite: '093',
	team: [{ dexId: 21, xp: 200 }],
	activePokemonPerside: 1,
	rewardMoney: 300,
	viewRange: 1,
};
//BROCKS_GYM
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
			xp: 5000,
			customMoves: ['earthquake', 'dragon-dance', 'earthquake', 'dragon-dance'],
		},
	],
	activePokemonPerside: 1,
	rewardMoney: 4000,
	rewardBadge: 'boulderBadge',
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
			customMoves: ['accelerock'],
		},
	],
	activePokemonPerside: 1,
	rewardMoney: 500,
	viewRange: 3,
};
export const brocksMinion3: Trainer = {
	id: 'brocks-minion3',
	type: 'TRAINER',
	position: {
		y: 4,
		x: 5,
		mapId: 'brocks-gym',
		orientation: 1,
	},
	dialogue: ['You are lightyears away from challenging brock!'],
	dialogueAfterDefeat: ['What is a lightyear, big dog?'],
	sprite: SpriteEnum.youngster2,
	team: [
		{
			dexId: 408,
			xp: 700,
		},
		{
			dexId: 932,
			xp: 700,
		},
	],
	activePokemonPerside: 1,
	rewardMoney: 500,
	viewRange: 3,
};
//BERRY_PATCH
export const bugcatcherBarry: Trainer = {
	id: 'bugCatcher-barry',
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
	id: 'bugCatcher-cisco',
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
	id: 'bugCatcher-ralph',
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
	id: 'bugCatcher-nash',
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
//FLAMING_DESERT
export const pyromaniacJavi: Trainer = {
	id: 'pyromaniac-javi',
	type: 'TRAINER',
	position: {
		y: 6,
		x: 6,
		mapId: 'flaming-desert',
		orientation: 0,
	},
	dialogue: ['I am experimenting with powerful fire'],
	dialogueAfterDefeat: ['You extinguished my flame...'],
	sprite: SpriteEnum.pyro,
	team: [{ dexId: 513, xp: 800 }],
	activePokemonPerside: 1,
	rewardMoney: 1000,
	viewRange: 3,
};
export const aceTrainerMelanie: Trainer = {
	id: 'ace-trainer-melanie',
	type: 'TRAINER',
	position: {
		y: 3,
		x: 11,
		mapId: 'flaming-desert',
		orientation: 1,
	},
	dialogue: ['We train under the harshest conditions'],
	dialogueAfterDefeat: ['Failure makes me stronger'],
	sprite: SpriteEnum.aceFemale,
	team: [
		{ dexId: 133, xp: 800 },
		{ dexId: 37, xp: 600 },
	],
	activePokemonPerside: 2,
	rewardMoney: 1500,
	viewRange: 4,
};
export const hikerBennet: Trainer = {
	id: 'hiker-bennet',
	type: 'TRAINER',
	position: {
		y: 6,
		x: 20,
		mapId: 'flaming-desert',
		orientation: 3,
	},
	dialogue: ['Hiking in the desert is dangerous', 'but its also beautiful'],
	dialogueAfterDefeat: ['Remember to stay hydrated'],
	sprite: SpriteEnum.hiker,
	team: [{ dexId: 28, xp: 1000 }],
	activePokemonPerside: 1,
	rewardMoney: 100,
	rewardItems: { 'fresh-water': 2 },
	viewRange: 5,
};
export const cowgirlAlex: Trainer = {
	id: 'cowgirl-alex',
	type: 'TRAINER',
	position: {
		y: 2,
		x: 25,
		mapId: 'flaming-desert',
		orientation: 0,
	},
	dialogue: [
		'My Pa and me are looking for wild Kangaskhan',
		'Have you seen any?',
	],
	dialogueAfterDefeat: ['Well, we better keep looking'],
	sprite: SpriteEnum.cowgirl,
	team: [{ dexId: 77, xp: 800 }],
	activePokemonPerside: 1,
	rewardMoney: 500,
	viewRange: 3,
};
export const farmerPike: Trainer = {
	id: 'farmer-pike',
	type: 'TRAINER',
	position: {
		y: 4,
		x: 29,
		mapId: 'flaming-desert',
		orientation: 1,
	},
	dialogue: [
		'These Kangaskhan are quite tricky to spot',
		'For their size at least',
	],
	dialogueAfterDefeat: ['Holler if you spot em'],
	sprite: SpriteEnum.farmer,
	team: [
		{ dexId: 128, xp: 800 },
		{ dexId: 507, xp: 1000 },
	],
	activePokemonPerside: 2,
	rewardMoney: 1000,
	viewRange: 1,
};
