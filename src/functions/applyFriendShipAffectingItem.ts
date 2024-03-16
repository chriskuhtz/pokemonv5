import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	ItemType,
	hasFriendshipEffect,
	isEvBoostItem,
} from '../interfaces/Item';

export const applyFriendshipAffectingItem = (
	pokemon: BattlePokemon,
	item: ItemType
): BattlePokemon => {
	const updated = { ...pokemon };
	let friendshipChange = -5;

	if (!hasFriendshipEffect(item)) {
		return pokemon;
	}

	if (item === 'heal-powder' || item === 'energy-powder') {
		if (updated.friendship > 199) {
			friendshipChange = -10;
		}
	}
	if (item === 'energy-root') {
		if (updated.friendship > 199) {
			friendshipChange = -15;
		} else friendshipChange = -10;
	}
	if (item === 'revival-herb') {
		if (updated.friendship > 199) {
			friendshipChange = -20;
		} else friendshipChange = -15;
	}
	//evBoostItem
	if (isEvBoostItem(item)) {
		if (updated.friendship > 199) {
			friendshipChange = 0;
		} else if (updated.friendship > 100) {
			friendshipChange = 2;
		} else friendshipChange = 4;
	}
	if (item === 'rare-candy') {
		friendshipChange = 1;
	}

	let finalFriendship = updated.friendship + friendshipChange;
	if (finalFriendship < 0) {
		finalFriendship = 0;
	}
	if (finalFriendship > 255) {
		finalFriendship = 255;
	}

	return {
		...updated,
		friendship: finalFriendship,
	};
};
