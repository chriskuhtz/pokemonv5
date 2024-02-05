import { OverworldEvent } from './OverworldEvent';

export interface Decorator {
	x: number;
	y: number;
	sprite: string;
	onStep?: OverworldEvent;
}
