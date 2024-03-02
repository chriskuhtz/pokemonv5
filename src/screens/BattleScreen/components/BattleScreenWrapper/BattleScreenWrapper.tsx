import { useGetCurrentSaveFile } from '../../../../hooks/xata/useCurrentSaveFile';
import { BattleScreen } from '../../BattleScreen';

export const BattleScreenWrapper = () => {
	const saveFile = useGetCurrentSaveFile();

	if (!saveFile) {
		return <div>Bullu</div>;
	}

	return <BattleScreen saveFile={saveFile} />;
};
