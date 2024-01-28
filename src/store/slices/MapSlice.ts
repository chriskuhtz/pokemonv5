import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { playerCharacterSlice } from './PlayerCharacterSlice';

export type BaseTileId = 'beach' | 'caveFloor' | 'cobblestone' | 'grass';

export interface MapState {
	height: number;
	width: number;
	baseTile: BaseTileId;
}
const initialState: MapState = {
	height: 2,
	width: 4,
	baseTile: 'grass',
};

export const mapSlice = createSlice({
	name: 'map',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {},
});

//export const {} = mapSlice.actions;

export const selectMap = (state: RootState) => state.map;

export default playerCharacterSlice.reducer;
