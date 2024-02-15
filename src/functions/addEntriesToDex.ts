import { DexEntry } from '../interfaces/DexEntry';

export const addEntriesToDex = (
	existing?: DexEntry[],
	dexUpdates?: DexEntry[]
): DexEntry[] => {
	if (!dexUpdates || !existing) {
		return [];
	}
	let updatedDex = [...existing];

	//update from seen to owned
	updatedDex = updatedDex.map((existingEntry) => {
		const update = dexUpdates.find((d) => d.dexId === existingEntry.dexId);
		if (
			update &&
			existingEntry.status === 'seen' &&
			update.status === 'owned'
		) {
			return update;
		}
		return existingEntry;
	});

	//add new entries
	dexUpdates.forEach((update) => {
		const existingEntry = updatedDex.find((d) => d.dexId === update.dexId);
		if (!existingEntry) {
			updatedDex.push(update);
		}
	});

	return updatedDex.sort((a, b) => a.dexId - b.dexId);
};
