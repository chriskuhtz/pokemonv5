import { ChooseActionAndTarget } from '../../components/ChooseActionAndTarget/ChooseActionAndTarget';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { useAppSelector } from '../../store/storeHooks';
import { Modal } from '../../ui_components/Modal/Modal';
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
	const { playerSide, opponentSide, handleAction, mode, selectAction } =
		useBattleScreen();

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
											selectAction={selectAction}
										/>
									) : (
										p.nextAction?.type
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
									p.nextAction ? p.nextAction.type : 'select an Action'
								}
							/>
						))}
					</div>
				</div>
				<Modal
					open={currentDialogue.length > 0}
					modalContent={
						<Pill
							center={currentDialogue[0]}
							style={{
								margin: '0 2rem',
								padding: '1rem 2rem',
								fontSize: 'larger',
							}}
							onClick={handleAction}
						/>
					}
				/>
			</div>
		);
	}
	return <FetchingScreen />;
};
