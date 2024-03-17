import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UniqueOccupantId } from '../../constants/UniqueOccupantRecord';
import { berryPatch } from '../../constants/maps/berryPatch';
import { brocksGym } from '../../constants/maps/brocksGym';
import { flamingDesert } from '../../constants/maps/flamingDesert';
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
	rarity?: number;
	customMoves?: string[];
}

export type MapEnvironment =
	| 'city'
	| 'field'
	| 'forest'
	| 'water'
	| 'cave'
	| 'desert'
	| 'building';
export interface MapState {
	height: number;
	width: number;
	baseTile: BaseTile;
	interactives: Partial<Record<UniqueOccupantId, Occupant>>;
	obstacles: (Obstacle | LargeObstacle)[];
	decorators: Decorator[];
	mapId: string;
	encounters: MapEncounter[];
	environment: MapEnvironment;
	encounterOnEveryField?: boolean;
}

const mapsRecord: Record<string, MapState> = {
	'starter-town': starterTown,
	'oaks-lab': oaksLab,
	'brocks-gym': brocksGym,
	'berry-patch': berryPatch,
	'flaming-desert': flamingDesert,
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
				occupantId: UniqueOccupantId;
			}>
		) => {
			const occupant = state.interactives[action.payload.occupantId];
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

			state.interactives[action.payload.occupantId] = updatedOccupant;
		},
	},
});

export const { turnNpcTowardsPlayer, setMapById } = mapSlice.actions;

export default mapSlice.reducer;
