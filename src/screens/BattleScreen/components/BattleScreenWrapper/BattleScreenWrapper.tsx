import { useGetCurrentSaveFile } from '../../../../hooks/xata/useCurrentSaveFile';
import { FetchingScreen } from '../../../FetchingScreen/FetchingScreen';
import { BattleScreen } from '../../BattleScreen';

export const BattleScreenWrapper = () => {
	const saveFile = useGetCurrentSaveFile();

	if (!saveFile) {
		return <FetchingScreen />;
	}

	return <BattleScreen saveFile={saveFile} />;
};
