import { IoIosCloseCircle } from 'react-icons/io';
import { BattleSprite } from '../../components/BattleSprite/BattleSprite';
import { ChooseActionAndTarget } from '../../components/ChooseActionAndTarget/ChooseActionAndTarget';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { RoutesEnum } from '../../router/router';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { useAppSelector } from '../../store/storeHooks';
import { Banner } from '../../ui_components/Banner/Banner';
import { ErrorMessage } from '../../ui_components/ErrorMessage/ErrorMessage';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import './battleScreen.css';
import { useBattleScreen } from './hooks/useBattleScreen';
import { isBattleAttack } from '../../interfaces/BattleAction';

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
		opponentFetchStatus,
		playerFetchStatus,
	} = useBattleScreen();

	if (
		opponentFetchStatus === 'error' ||
		playerFetchStatus === 'error' ||
		(playerFetchStatus === 'success' && playerSide?.field.length === 0) ||
		(opponentFetchStatus === 'success' && opponentSide?.field.length === 0)
	) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'stretch',
					justifyContent: 'center',
				}}
			>
				<ErrorMessage message={'Something went wrong'} />
				<RouterButton text={'Back to Overworld'} to={RoutesEnum.overworld} />
			</div>
		);
	}
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
								overlay={
									p.nextAction && (
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											{isBattleAttack(p.nextAction)
												? p.nextAction.move
												: p.nextAction.type}{' '}
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
							<BattleSprite key={p.id} pokemon={p} />
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
