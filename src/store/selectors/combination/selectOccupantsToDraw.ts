import { createSelector } from '@reduxjs/toolkit';
import { checkQuestCondition } from '../../../functions/checkQuestCondition';
import { isOccupantWithSprite } from '../../../functions/typeguards/isOccupantWithDialogue';
import { selectOccupants } from '../map/selectOccupants';
import { selectSaveFile } from '../saveFile/selectSaveFile';

export const selectOccupantsToDraw = createSelector(
	[selectOccupants, selectSaveFile],
	(occupants, saveFile) => {
		if (!saveFile) {
			return {};
		}
		return Object.fromEntries(
			Object.entries(occupants).filter(
				(entry) =>
					isOccupantWithSprite(entry[1]) &&
					checkQuestCondition(saveFile.quests, entry[1].questCondition)
			)
		);
	}
);
