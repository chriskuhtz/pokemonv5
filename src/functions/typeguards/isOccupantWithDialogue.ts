import {
	Occupant,
	OccupantWithDialogue,
} from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

export function isOccupantWithDialogue(x: Occupant): x is OccupantWithDialogue {
	return ['NPC', 'HEALER', 'MERCHANT'].includes(x.type);
}
