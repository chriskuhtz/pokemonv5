import { createSlice } from '@reduxjs/toolkit';
import { OrientationEnum } from '../../interfaces/Orientation';
import { SpriteEnum } from '../../interfaces/Sprites';
import { RootState } from '../store';
import { CharacterPosition } from './PlayerCharacterSlice';

export type BaseTileId = 'beach' | 'caveFloor' | 'cobblestone' | 'grass';
export interface Occupant {
	position: CharacterPosition;
	sprite: SpriteEnum;
}
export interface MapState {
	height: number;
	width: number;
	baseTile: BaseTileId;
	occupants: Occupant[];
}
const initialState: MapState = {
	height: 20,
	width: 40,
	baseTile: 'grass',
	occupants: [
		{
			sprite: SpriteEnum['oak'],
			position: {
				orientation: OrientationEnum['DOWN'],
				x: 5,
				y: 1,
				mapId: 'testMap',
			},
		},
	],
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
