import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import {
	UniqueOccupantIds,
	UniqueOccupantRecord,
} from '../../constants/UniqueOccupantRecord';
import { checkQuestCondition } from '../../functions/checkQuestCondition';
import { getOppositeDirection } from '../../functions/getOppositeDirection';
import { isOccupantWithSprite } from '../../functions/typeguards/isOccupantWithDialogue';
import { OrientationEnum } from '../../interfaces/Orientation';
import { Occupant } from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { RootState } from '../store';
import { selectSaveFile } from './saveFileSlice';

export type BaseTileId = 'beach' | 'caveFloor' | 'cobblestone' | 'grass';

export interface MapState {
	height: number;
	width: number;
	baseTile: BaseTileId;
	occupants: Partial<Record<UniqueOccupantIds, Occupant>>;
}
const initialState: MapState = {
	height: 20,
	width: 9,
	baseTile: 'grass',
	occupants: UniqueOccupantRecord,
};

export const mapSlice = createSlice({
	name: 'map',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		turnNpcTowardsPlayer: (
			state,
			action: PayloadAction<{
				playerOrientation: OrientationEnum;
				occupantId: string;
			}>
		) => {
			const occupant =
				state.occupants[action.payload.occupantId as UniqueOccupantIds];
			if (!occupant) {
				return;
			}
			const newDirection = getOppositeDirection(
				action.payload.playerOrientation
			);

			if (occupant.position.orientation === newDirection) {
				return;
			}
			const updatedOccupant: Occupant = {
				...occupant,
				position: {
					...occupant.position,
					orientation: newDirection,
				},
			};

			console.log(occupant, updatedOccupant, 'test');
			state.occupants[action.payload.occupantId as UniqueOccupantIds] =
				updatedOccupant;
		},
	},
});

export const { turnNpcTowardsPlayer } = mapSlice.actions;

export const selectMap = (state: RootState) => state.map;
export const selectOccupants = (state: RootState) => state.map.occupants;

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

export default mapSlice.reducer;
