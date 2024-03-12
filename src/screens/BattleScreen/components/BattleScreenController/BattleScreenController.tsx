import { ChooseActionAndTarget } from '../../../../components/ChooseActionAndTarget/ChooseActionAndTarget';
import { ChooseRefill } from '../../../../components/ChooseActionAndTarget/components/ChooseRefill';
import { useGetCurrentSaveFile } from '../../../../hooks/xata/useCurrentSaveFile';
import { BattleEnvironment } from '../../../../interfaces/BattleEnvironment';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { SelectableAction } from '../../../../interfaces/SelectableAction';
import { selectCurrentDialogue } from '../../../../store/selectors/dialogue/selectCurrentDialogue';
import { selectNextNotification } from '../../../../store/selectors/notification/selectNextNotification';
import { addNotification } from '../../../../store/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import { Banner } from '../../../../ui_components/Banner/Banner';
import { BattleMode, BattleSide } from '../../BattleScreen';

export const BattleScreenController = ({
	nextPlayerPokemonWithoutAction,
	mode,
	playerSide,
	opponentSide,
	availableActions,
	selectAction,
	hasOpenSpots,
	setPlayerSide,
	setMode,
	handleAction,
	environment,
	setEnvironment,
}: {
	nextPlayerPokemonWithoutAction: BattlePokemon | undefined;
	mode: BattleMode;
	playerSide: BattleSide;
	opponentSide: BattleSide;
	availableActions: SelectableAction[];
	hasOpenSpots: boolean;
	handleAction: () => void;
	selectAction: (updatedActor: BattlePokemon) => void;
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>;
	setMode: React.Dispatch<React.SetStateAction<BattleMode>>;
	environment: BattleEnvironment;
	setEnvironment: React.Dispatch<React.SetStateAction<BattleEnvironment>>;
}): JSX.Element => {
	const dispatch = useAppDispatch();
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const noti = useAppSelector(selectNextNotification);
	const saveFile = useGetCurrentSaveFile();

	if (noti || !saveFile) {
		return <></>;
	}
	if (mode === 'HANDLING_ENVIRONMENT') {
		dispatch(addNotification(`The Weather is: ${environment.weather?.type}`));
		setMode('EXECUTING');
		return <></>;
	}
	if (currentDialogue.length === 0 && hasOpenSpots) {
		return (
			<ChooseRefill
				playerSide={playerSide}
				setPlayerSide={setPlayerSide}
				setEnvironment={setEnvironment}
			/>
		);
	}
	if (
		currentDialogue.length === 0 &&
		nextPlayerPokemonWithoutAction &&
		mode === 'COLLECTING'
	) {
		return (
			<ChooseActionAndTarget
				actor={nextPlayerPokemonWithoutAction}
				availableActions={availableActions}
				selectAction={selectAction}
				pokemonOnField={[...playerSide.field, ...opponentSide.field]}
				inventory={saveFile.inventory}
			/>
		);
	}

	if (currentDialogue.length > 0) {
		return (
			<Banner
				content={currentDialogue[0]}
				onClick={() => {
					handleAction();
					setMode('EXECUTING');
				}}
			/>
		);
	}

	return <></>;
};
