import { createSlice } from '@reduxjs/toolkit';
import {
	UniqueOccupantIds,
	UniqueOccupantRecord,
} from '../../constants/UniqueOccupantRecord';
import { Occupant } from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { RootState } from '../store';

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
	reducers: {},
});

//export const {} = mapSlice.actions;

export const selectMap = (state: RootState) => state.map;
export const selectOccupants = (state: RootState) => state.map.occupants;

export default mapSlice.reducer;
