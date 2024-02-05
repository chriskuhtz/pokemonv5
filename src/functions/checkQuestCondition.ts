import { QuestIdAndStatus } from '../interfaces/QuestIdAndStatus';
import { SaveFile } from '../interfaces/SaveFile';

export const checkQuestCondition = (
	quests: SaveFile['quests'],
	questCondition?: QuestIdAndStatus,
	isQuestCheck?: boolean
) => {
	if (!questCondition) {
		return true;
	}
	if (isQuestCheck) {
		return quests[questCondition.id] !== questCondition.status;
	}
	return quests[questCondition.id] === questCondition.status;
};
