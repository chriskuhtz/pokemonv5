import { ChooseActionAndTarget } from '../../../../components/ChooseActionAndTarget/ChooseActionAndTarget';
import { ChooseRefill } from '../../../../components/ChooseActionAndTarget/components/ChooseRefill';
import { isBattleActionWithTarget } from '../../../../interfaces/BattleAction';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { selectCurrentDialogue } from '../../../../store/selectors/dialogue/selectCurrentDialogue';
import { useAppSelector } from '../../../../store/storeHooks';
import { Banner } from '../../../../ui_components/Banner/Banner';
import { BattleMode, BattleSide } from '../../BattleScreen';
import { SelectableAction } from '../../hooks/useBattleScreen';

export const BattleScreenController = ({
	nextPokemonWithoutAction,
	mode,
	opponentSide,
	playerSide,
	availableActions,
	selectAction,
	hasOpenSpots,
	setPlayerSide,
	setMode,
	handleAction,
}: {
	nextPokemonWithoutAction: BattlePokemon | undefined;
	mode: BattleMode;
	opponentSide: BattleSide;
	playerSide: BattleSide;
	availableActions: SelectableAction[];
	hasOpenSpots: boolean;
	handleAction: () => void;
	selectAction: (updatedActor: BattlePokemon) => void;
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>;
	setMode: React.Dispatch<React.SetStateAction<BattleMode>>;
}): JSX.Element => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	if (currentDialogue.length === 0 && hasOpenSpots) {
		return (
			<ChooseRefill playerSide={playerSide} setPlayerSide={setPlayerSide} />
		);
	}
	if (
		currentDialogue.length === 0 &&
		nextPokemonWithoutAction &&
		mode === 'COLLECTING'
	) {
		return (
			<ChooseActionAndTarget
				actor={nextPokemonWithoutAction}
				availableTargets={opponentSide?.field ?? []}
				availableSwitches={
					playerSide?.bench.filter((benchmon) =>
						playerSide.field.every(
							(fieldmon) =>
								fieldmon.nextAction === undefined ||
								(isBattleActionWithTarget(fieldmon.nextAction) &&
									fieldmon.nextAction.target !== benchmon.id)
						)
					) ?? []
				}
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
