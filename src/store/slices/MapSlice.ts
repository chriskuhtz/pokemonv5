import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UniqueOccupantIds } from '../../constants/UniqueOccupantRecord';
import { oaksLab } from '../../constants/maps/oaksLab';
import { starterTown } from '../../constants/maps/starterTown';
import { getOppositeDirection } from '../../functions/getOppositeDirection';
import { OrientationEnum } from '../../interfaces/Orientation';
import { Decorator } from '../../screens/OverworldScreen/interfaces/Decorator';
import {
	LargeObstacle,
	Obstacle,
	Occupant,
} from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

export type BaseTileId =
	| 'beach'
	| 'caveFloor'
	| 'cobblestone'
	| 'grass'
	| 'gray';
export type BaseTilePattern =
	| 'uniform'
	| 'checkered'
	| 'random3'
	| 'random4'
	| 'random5'
	| 'random6';

export interface BaseTile {
	id: BaseTileId;
	pattern: BaseTilePattern;
}
export interface MapEncounter {
	dexId: number;
	xp: number;
}
export interface MapState {
	height: number;
	width: number;
	baseTile: BaseTile;
	interactives: Partial<Record<UniqueOccupantIds, Occupant>>;
	obstacles: (Obstacle | LargeObstacle)[];
	decorators: Decorator[];
	mapId: string;
	encounters: MapEncounter[];
}

const mapsRecord: Record<string, MapState> = {
	'starter-town': starterTown,
	'oaks-lab': oaksLab,
};

const initialState: MapState = starterTown;

export const mapSlice = createSlice({
	name: 'map',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setMapById: (state, action: PayloadAction<string>) => {
			if (state.mapId === action.payload) {
				return;
			}
			if (mapsRecord[action.payload]) {
				return mapsRecord[action.payload];
			} else console.error('invalid mapId, cant set state');
		},
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

export const { turnNpcTowardsPlayer, setMapById } = mapSlice.actions;

export default mapSlice.reducer;
