import { useCallback, useEffect, useState } from 'react';
import { SaveFile } from '../interfaces/SaveFile';
import { getXataClient } from '../xata';

export const useGetAllSaveFiles = () => {
	const [isFetching, setFetching] = useState<boolean>(false);
	const [isError, setError] = useState<boolean>(false);
	const [saveFiles, setSaveFiles] = useState<SaveFile[]>([]);

	const getAllSaveFiles = useCallback(async () => {
		if (isFetching || saveFiles.length > 0) {
			return;
		}
		setFetching(true);
		const xata = getXataClient();
		const { records } = await xata.db.accounts.getPaginated();
		console.log(records);
		if (!records) {
			setFetching(false);
			setError(true);
			return;
		}
		setSaveFiles(
			records.map((r) => {
				return {
					username: r.username ?? '',
					position: {
						x: 0,
						y: 0,
						forwardFoot: 0,
						mapId: 'testMap',
						orientation: 0,
					},
					id: r.id,
					sprite: r.sprite ?? '001',
					quests: { pickStarter: 'inactive', talkToNurseJoy: 'inactive' },
					handledOccupants: {
						'starter-town-ballMachine': false,
						'starter-town-grass-blocker': false,
						'starter-town-merchant': false,
						'starter-town-nurse-quest': false,
						'starter-town-nurse': false,
						'starter-town-oak-after-selection': false,
						'starter-town-oak-before-selection': false,
						'starter-town-oak-during-selection': false,
					},
					pokedex: [],
					pokemon: [],
					money: 5000,
					inventory: { potion: 0, repel: 0, 'poke-ball': 0 },
				};
			})
		);
		setFetching(false);
	}, [isFetching, saveFiles]);
	useEffect(() => void getAllSaveFiles(), [getAllSaveFiles]);
	return { isFetching, saveFiles, isError };
};
