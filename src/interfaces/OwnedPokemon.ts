import { Ability } from '../constants/abilityCheckList';
import { PrimaryAilment } from './Ailment';
import { ItemType, PokeballType } from './Item';
import { StatObject } from './StatObject';

export interface OwnedPokemon {
	dexId: number;
	id: string;
	onTeam?: boolean;
	xp: number;
	damage: number;
	ownerId: string;
	moveNames: string[];
	ability: Ability;
	primaryAilment?: PrimaryAilment;
	ball: PokeballType;
	shiny?: boolean;
	friendship: number;
	usedPowerPoints: UsedPowerPoints;
	heldItemName?: ItemType;
	effortValues: StatObject;
	ppBoostedMoves: PPBoostedMove[];
}
export interface PPBoostedMove {
	name: string;
	boost: number;
}
export interface UsedPowerPoints {
	firstMove: number;
	secondMove: number;
	thirdMove: number;
	fourthMove: number;
}
