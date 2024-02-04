import {
	Occupant,
	OccupantWithDialogue,
	OccupantWithSprite,
} from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

export function isOccupantWithDialogue(x: Occupant): x is OccupantWithDialogue {
	return ['NPC', 'HEALER', 'MERCHANT'].includes(x.type);
}
export function isOccupantWithSprite(x: Occupant): x is OccupantWithSprite {
	return [
		'NPC',
		'HEALER',
		'MERCHANT',
		'ITEM',
		'OBSTACLE',
		'LARGE_OBSTACLE',
	].includes(x.type);
}
