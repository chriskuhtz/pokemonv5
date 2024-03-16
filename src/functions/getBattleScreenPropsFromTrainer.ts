import { BattleScreenProps } from '../screens/BattleScreen/hooks/useBattleScreen';
import { Trainer } from '../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { MapEnvironment } from '../store/slices/MapSlice';

export const getBattleScreenPropsFromTrainer = (
	trainer: Trainer,
	environment: MapEnvironment
): BattleScreenProps => {
	return {
		opponents: trainer.team,
		trainerId: trainer.id,
		activePokemonPerSide: trainer.activePokemonPerside,
		outside: environment,
	};
};
