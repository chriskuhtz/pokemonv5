import { DexEntry } from '../interfaces/DexEntry';

export const addEntriesToDex = (
	existing?: DexEntry[],
	dexUpdates?: DexEntry[]
): DexEntry[] => {
	if (!dexUpdates || !existing) {
		return [];
	}
	const updatedDex = [...existing];

	dexUpdates.forEach((update) => {
		const existingEntry = updatedDex.find((d) => d.dexId === update.dexId);

		if (
			!existingEntry ||
			(existingEntry.status === 'seen' && update.status === 'owned')
		) {
			updatedDex.push(update);
		}
	});

	return updatedDex
		.sort((a, b) => a.dexId - b.dexId)
		.filter((entry, index) => {
			if (index === 0) {
				return true;
			}
			if (entry.dexId === updatedDex[index - 1].dexId) {
				return false;
			}
			return true;
		});
};
