import { QuestIdAndStatus } from '../interfaces/QuestIdAndStatus';
import { SaveFile } from '../interfaces/SaveFile';

export const checkQuestCondition = (
	quests: SaveFile['quests'],
	questCondition?: QuestIdAndStatus
) => {
	if (!questCondition) {
		return true;
	}
	return quests[questCondition.id] === questCondition.status;
};
