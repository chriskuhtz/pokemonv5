import {
	Occupant,
	InvisibleBlocker,
} from '../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { Position } from '../screens/OverworldScreen/interfaces/Position';

export const getBlockersForLargeOccupants = (
	occupants: Occupant[]
): InvisibleBlocker[] => {
	const res: InvisibleBlocker[] = [];

	occupants.forEach((occupant) => {
		if (occupant.type !== 'LARGE_OBSTACLE') {
			return;
		}
		const positionsArray: Position[] = [];

		let i = occupant.position.y;

		while (
			i >
			occupant.position.y - (occupant.height - (occupant.clearanceBehind ?? 0))
		) {
			let j = occupant.position.x;
			while (j < occupant.position.x + occupant.width) {
				//Do nothing for the actual position of the obstacle
				if (!(i === occupant.position.y && j === occupant.position.x)) {
					positionsArray.push({ y: i, x: j });
				}
				j++;
			}

			i--;
		}

		positionsArray.forEach((p) =>
			res.push({
				type: 'INVISIBLE_BLOCKER',
				id: occupant.id,
				onClick: occupant.onClick,
				position: {
					...p,
					orientation: 0,
					mapId: 'starter-town',
				},
			})
		);
	});

	return res;
};
