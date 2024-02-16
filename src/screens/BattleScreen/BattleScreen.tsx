import { ChooseActionAndTarget } from '../../components/ChooseActionAndTarget/ChooseActionAndTarget';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { useAppSelector } from '../../store/storeHooks';
import { Pill } from '../../ui_components/Pill/Pill';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import './battleScreen.css';
import { BattlePill } from './components/BattlePill/BattlePill';
import { useBattleScreen } from './hooks/useBattleScreen';

export interface BattleSide {
	field: BattlePokemon[];
	bench: BattlePokemon[];
	defeated: BattlePokemon[];
	caught: BattlePokemon[];
	side: 'PLAYER' | 'OPPONENT';
}

export type BattleMode = 'COLLECTING' | 'EXECUTING';

export const BattleScreen = (): JSX.Element => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const {
		playerSide,
		opponentSide,
		handleAction,
		mode,
		selectAction,
		resetAction,
		availableActions,
	} = useBattleScreen();

	if (playerSide && opponentSide) {
		return (
			<div className="battle">
				<div className="battleField">
					<div className="playerField">
						{playerSide?.field.map((p) => (
							<BattlePill
								key={p.id}
								back
								pokemon={p}
								rightSide={
									mode === 'COLLECTING' && !p.nextAction ? (
										<ChooseActionAndTarget
											actor={p}
											availableTargets={opponentSide?.field ?? []}
											availableActions={availableActions}
											selectAction={selectAction}
										/>
									) : (
										<div>
											{p.nextAction?.type}{' '}
											<Pill onClick={() => resetAction(p.id)} center={'X'} />
										</div>
									)
								}
							/>
						))}
					</div>
					<div className="opponentField">
						{opponentSide?.field.map((p) => (
							<BattlePill
								key={p.id}
								pokemon={p}
								rightSide={
									p.nextAction ? p.nextAction.type : 'no assigned actions'
								}
							/>
						))}
					</div>
				</div>
				{currentDialogue.length > 0 && (
					<button className="bottomDialogue" onClick={handleAction}>
						{currentDialogue[0]}
					</button>
				)}
			</div>
		);
	}
	return <FetchingScreen />;
};
