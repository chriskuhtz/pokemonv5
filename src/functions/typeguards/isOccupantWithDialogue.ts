import {
	Occupant,
	OccupantWithDialogue,
	OccupantWithPossibleOnClick,
	OccupantWithSprite,
} from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

export function isOccupantWithDialogue(x: Occupant): x is OccupantWithDialogue {
	return ['NPC', 'HEALER', 'MERCHANT', 'TRAINER'].includes(x.type);
}
export function isOccupantWithSprite(x: Occupant): x is OccupantWithSprite {
	return [
		'NPC',
		'HEALER',
		'MERCHANT',
		'ITEM',
		'OBSTACLE',
		'LARGE_OBSTACLE',
		'TRAINER',
	].includes(x.type);
}
export function isOccupantWithPossibleOnClick(
	x: Occupant
): x is OccupantWithPossibleOnClick {
	return ['OBSTACLE', 'LARGE_OBSTACLE', 'INVISIBLE_BLOCKER'].includes(x.type);
}
