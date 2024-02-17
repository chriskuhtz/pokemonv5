import { IoIosCloseCircle } from 'react-icons/io';
import { BattleSprite } from '../../components/BattleSprite/BattleSprite';
import { Banner } from '../../components/BottomBanner/Banner';
import { ChooseActionAndTarget } from '../../components/ChooseActionAndTarget/ChooseActionAndTarget';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { useAppSelector } from '../../store/storeHooks';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import './battleScreen.css';
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
		nextPokemonWithoutAction,
		pokemonWithActions,
	} = useBattleScreen();

	if (playerSide && opponentSide) {
		return (
			<div className="battle">
				<div className="battleField">
					<div className="playerField">
						{playerSide?.field.map((p) => (
							<BattleSprite
								key={p.id}
								back
								pokemon={p}
								active={
									pokemonWithActions.length > 0 &&
									pokemonWithActions[0].id === p.id
								}
								overlay={
									p.nextAction && (
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											{p.nextAction?.type}{' '}
											{mode === 'COLLECTING' && (
												<IoIosCloseCircle
													style={{ height: '40px', width: '40px' }}
													onClick={() => resetAction(p.id)}
												/>
											)}
										</div>
									)
								}
							/>
						))}
					</div>
					<div className="opponentField">
						{opponentSide?.field.map((p) => (
							<BattleSprite
								key={p.id}
								pokemon={p}
								active={
									mode === 'EXECUTING' &&
									pokemonWithActions.length > 0 &&
									pokemonWithActions[0].id === p.id
								}
							/>
						))}
					</div>
				</div>
				{nextPokemonWithoutAction && mode === 'COLLECTING' && (
					<ChooseActionAndTarget
						actor={nextPokemonWithoutAction}
						availableTargets={opponentSide?.field ?? []}
						availableActions={availableActions}
						selectAction={selectAction}
					/>
				)}
				{currentDialogue.length > 0 && (
					<Banner content={currentDialogue[0]} onClick={handleAction} />
				)}
			</div>
		);
	}
	return <FetchingScreen />;
};
