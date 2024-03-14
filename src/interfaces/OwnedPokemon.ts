import { Ability } from '../constants/abilityCheckList';
import { PrimaryAilment } from './Ailment';
import { PokeballType } from './Inventory';

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
}

export interface UsedPowerPoints {
	firstMove: number;
	secondMove: number;
	thirdMove: number;
	fourthMove: number;
}
