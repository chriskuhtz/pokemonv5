import { MapEncounter, TimeOfDay } from '../store/slices/MapSlice';

export const determineMapEncounters = (
	encounters: MapEncounter[],
	timeOfDay: TimeOfDay
): MapEncounter[] => {
	const assembledEncounters: MapEncounter[] = [];

	const availableEncounters = encounters.filter(
		(e) => !e.timeOfDay || e.timeOfDay === timeOfDay
	);

	availableEncounters.forEach((p) => {
		let i = 0;
		while (i < (p.rarity ?? 1)) {
			assembledEncounters.push({ ...p, rarity: 1 });
			i += 1;
		}
	});

	const opponents = [
		availableEncounters[Math.round(Math.random() * availableEncounters.length)],
	];
	if (Math.random() > 0.8) {
		opponents.push(
			availableEncounters[
				Math.round(Math.random() * availableEncounters.length)
			]
		);
	}

	return opponents;
};
