import { Position } from './Position';

export interface Rotating {
	type: 'ROTATING';
}
export interface Pathing {
	type: 'PATHING';
	path: Position[];
	index: number;
}
export type Movement = Rotating | Pathing;
