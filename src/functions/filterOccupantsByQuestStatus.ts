import { SaveFile } from '../interfaces/SaveFile';
import { Occupant } from '../screens/OverWorldScreen/interfaces/Occupants/Occupant';
import { checkQuestCondition } from './checkQuestCondition';

export const filterOccupantsByQuestStatus = (
	occupants: Occupant[],
	quests: SaveFile['quests']
): Occupant[] => {
	return occupants.filter((o) => {
		if (!o.questCondition) {
			//Occupant has no quest condition, always display
			return true;
		}
		if (o.questCondition) {
			return checkQuestCondition(quests, o.questCondition);
		}
		return false;
	});
};
