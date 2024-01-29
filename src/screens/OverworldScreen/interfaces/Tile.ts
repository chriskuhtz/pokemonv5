import { OverworldEvent } from './OverworldEvent';

export type BaseTileId = 'beach' | 'caveFloor' | 'cobblestone' | 'grass';
export type DecorationId = 'lantern' | 'tallGrass';
export interface Decoration {
	id: DecorationId;
	height: number;
	width: number;
}

export const BaseTileMap: Record<BaseTileId, Record<number, number>> = {
	grass: { 1: 10, 2: 20, 3: 30, 4: 40, 5: 100 },
	caveFloor: { 1: 100 },
	beach: { 1: 30, 2: 60, 3: 90, 4: 100 },
	cobblestone: { 1: 18, 2: 36, 3: 54, 4: 72, 5: 90, 6: 100 },
};
export const DecorationMap: Record<DecorationId, Decoration> = {
	lantern: { id: 'lantern', height: 3, width: 1 },
	tallGrass: { id: 'tallGrass', height: 1, width: 1 },
};

export interface Tile {
	onStep?: OverworldEvent;
	decoration?: Decoration;
	baseTileIndex?: string;
}
