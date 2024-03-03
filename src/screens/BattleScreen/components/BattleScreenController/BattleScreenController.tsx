import { ChooseActionAndTarget } from '../../../../components/ChooseActionAndTarget/ChooseActionAndTarget';
import { ChooseRefill } from '../../../../components/ChooseActionAndTarget/components/ChooseRefill';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { selectCurrentDialogue } from '../../../../store/selectors/dialogue/selectCurrentDialogue';
import { selectNextNotification } from '../../../../store/selectors/notification/selectNextNotification';
import { useAppSelector } from '../../../../store/storeHooks';
import { Banner } from '../../../../ui_components/Banner/Banner';
import { BattleMode, BattleSide } from '../../BattleScreen';
import { SelectableAction } from '../../hooks/useBattleScreen';

export const BattleScreenController = ({
	nextPlayerPokemonWithoutAction,
	mode,
	playerSide,
	availableActions,
	selectAction,
	hasOpenSpots,
	setPlayerSide,
	setMode,
	handleAction,
}: {
	nextPlayerPokemonWithoutAction: BattlePokemon | undefined;
	mode: BattleMode;
	playerSide: BattleSide;
	availableActions: SelectableAction[];
	hasOpenSpots: boolean;
	handleAction: () => void;
	selectAction: (updatedActor: BattlePokemon) => void;
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>;
	setMode: React.Dispatch<React.SetStateAction<BattleMode>>;
}): JSX.Element => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const noti = useAppSelector(selectNextNotification);

	if (noti) {
		return <></>;
	}
	if (currentDialogue.length === 0 && hasOpenSpots) {
		return (
			<ChooseRefill playerSide={playerSide} setPlayerSide={setPlayerSide} />
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
