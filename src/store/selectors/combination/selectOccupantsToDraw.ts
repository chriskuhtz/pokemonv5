import { createSelector } from '@reduxjs/toolkit';
import { checkQuestCondition } from '../../../functions/checkQuestCondition';
import { isOccupantWithSprite } from '../../../functions/typeguards/isOccupantWithDialogue';
import { selectOccupants } from '../map/selectOccupants';
import { selectQuests } from '../saveFile/selectQuests';

export const selectOccupantsToDraw = createSelector(
	[selectOccupants, selectQuests],
	(occupants, quests) => {
		if (!quests) {
			return {};
		}
		return Object.fromEntries(
			Object.entries(occupants).filter(
				(entry) =>
					isOccupantWithSprite(entry[1]) &&
					checkQuestCondition(quests, entry[1].questCondition)
			)
		);
	}
);
