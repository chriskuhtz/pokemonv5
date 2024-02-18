import { QuestName, QuestStatus } from './Quest';

export interface QuestIdAndStatus {
	id: QuestName;
	status: QuestStatus;
	negate?: boolean;
}
