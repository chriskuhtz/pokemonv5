import { UniqueOccupantIds } from '../constants/UniqueOccupantRecord';
import { BattleScreenProps } from '../screens/BattleScreen/hooks/useBattleScreen';
import { Trainer } from '../screens/OverworldScreen/interfaces/Occupants/Occupant';

export const getBattleScreenPropsFromTrainer = (
	trainer: Trainer
): BattleScreenProps => {
	return {
		opponents: trainer.team,
		trainerId: trainer.id as UniqueOccupantIds,
		activePokemonPerSide: trainer.activePokemonPerside,
	};
};
