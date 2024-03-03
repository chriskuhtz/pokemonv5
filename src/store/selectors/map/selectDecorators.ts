import { createSelector } from '@reduxjs/toolkit';
import { UniqueOccupantIds } from '../../../constants/UniqueOccupantRecord';
import { SaveFile } from '../../../interfaces/SaveFile';
import { Decorator } from '../../../screens/OverworldScreen/interfaces/Decorator';
import { Occupant } from '../../../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { SpottedEvent } from '../../../screens/OverworldScreen/interfaces/OverworldEvent';
import { selectActiveOccupants } from '../combination/selectActiveOccupants';
import { selectHandledOccupants } from '../saveFile/selectHandledOccupants';
import { selectMap } from './selectMap';

export const getTrainerDecorators = (
	occupants: Occupant[],
	handledOccupants?: SaveFile['handledOccupants']
): Decorator[] => {
	const res: Decorator[] = [];

	occupants.forEach((o) => {
		const occupantId = o.id as UniqueOccupantIds;
		const handled = handledOccupants?.[occupantId];
		if (o.type !== 'TRAINER' || handled) {
			return;
		}

		if (o.viewRange) {
			Array.from({ length: o.viewRange }).forEach((_, i) => {
				const event: SpottedEvent = {
					type: 'SPOTTED',
					trainer: o,
				};
				if (o.position.orientation === 0) {
					res.push({
						y: o.position.y + i + 1,
						x: o.position.x,
						sprite: '',
						onStep: event,
					});
				}
				if (o.position.orientation === 1) {
					res.push({
						y: o.position.y,
						x: o.position.x - (i + 1),
						sprite: '',
						onStep: event,
					});
				}
				if (o.position.orientation === 2) {
					res.push({
						y: o.position.y,
						x: o.position.x + i + 1,
						sprite: '',
						onStep: event,
					});
				}
				if (o.position.orientation === 3) {
					res.push({
						y: o.position.y - (i + 1),
						x: o.position.x,
						sprite: '',
						onStep: event,
					});
				}
			});
		}
	});
	return res;
};

export const selectDecorators = createSelector(
	[selectActiveOccupants, selectMap, selectHandledOccupants],
	(activeOccupants, map, handledOccupants) => {
		return [
			...map.decorators,
			...getTrainerDecorators(activeOccupants, handledOccupants),
		];
	}
);
