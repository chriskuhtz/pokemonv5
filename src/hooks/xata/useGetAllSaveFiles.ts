import { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { SaveFile } from '../../interfaces/SaveFile';
import { getXataClient } from './xataClient';

export const staticSaveData: SaveFile = {
	playerId: v4(),
	username: 'generic username',
	position: {
		x: 0,
		y: 0,
		forwardFoot: 0,
		mapId: 'testMap',
		orientation: 0,
	},
	sprite: '135',
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

export interface SaveFileDBEntry {
	id: string;
	saveFile: SaveFile;
}

export const useGetAllSaveFiles = () => {
	const [isFetching, setFetching] = useState<boolean>(false);
	const [isError, setError] = useState<boolean>(false);
	const [isSuccess, setSuccess] = useState<boolean>(false);
	const [saveFiles, setSaveFiles] = useState<SaveFileDBEntry[]>([]);

	const getAllSaveFiles = useCallback(async () => {
		if (isFetching || isSuccess) {
			return;
		}
		setFetching(true);
		const xata = getXataClient();
		const records = await xata.db.saveFiles.getMany();

		if (!records) {
			setFetching(false);
			setError(true);
			return;
		}
		setSaveFiles(records.map((r) => ({ id: r.id, saveFile: r.saveFile })));
		setSuccess(true);
		setFetching(false);
	}, [isFetching, isSuccess]);
	useEffect(() => void getAllSaveFiles(), [getAllSaveFiles]);
	return { isFetching, saveFiles, isError, isSuccess };
};
