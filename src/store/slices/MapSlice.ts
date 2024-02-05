import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UniqueOccupantIds } from '../../constants/UniqueOccupantRecord';
import { getOppositeDirection } from '../../functions/getOppositeDirection';
import { OrientationEnum } from '../../interfaces/Orientation';
import {
	LargeObstacle,
	Obstacle,
	Occupant,
} from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { starterTown } from '../../constants/maps/starterTown';

export type BaseTileId = 'beach' | 'caveFloor' | 'cobblestone' | 'grass';

export interface MapState {
	height: number;
	width: number;
	baseTile: BaseTileId;
	interactives: Partial<Record<UniqueOccupantIds, Occupant>>;
	obstacles: (Obstacle | LargeObstacle)[];
	mapId: string;
}

const initialState: MapState = starterTown;

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
				state.interactives[action.payload.occupantId as UniqueOccupantIds];
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

			state.interactives[action.payload.occupantId as UniqueOccupantIds] =
				updatedOccupant;
		},
	},
});

export const { turnNpcTowardsPlayer } = mapSlice.actions;

export default mapSlice.reducer;
