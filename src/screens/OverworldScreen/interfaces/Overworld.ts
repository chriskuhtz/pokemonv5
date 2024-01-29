import { Occupant } from './Occupants/Occupant';
import { BaseTileId, Tile } from './Tile';

export type MapId = 'starter-town';

export type OverworldMap = {
	id: MapId;
	map: Tile[][];
	encounters: number[];
	occupants?: Occupant[];
	baseTile: BaseTileId;
};
