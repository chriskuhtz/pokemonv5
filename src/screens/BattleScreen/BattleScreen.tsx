import { IoIosCloseCircle } from 'react-icons/io';
import { BattleSprite } from '../../components/BattleSprite/BattleSprite';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { isBattleAttack } from '../../interfaces/BattleAction';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { SaveFile } from '../../interfaces/SaveFile';
import { RoutesEnum } from '../../router/router';
import { ErrorMessage } from '../../ui_components/ErrorMessage/ErrorMessage';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import './battleScreen.css';
import { BattleScreenController } from './components/BattleScreenController/BattleScreenController';
import { useBattleScreen } from './hooks/useBattleScreen';

export interface BattleSide {
	field: BattlePokemon[];
	bench: BattlePokemon[];
	defeated: BattlePokemon[];
	caught: BattlePokemon[];
	side: 'PLAYER' | 'OPPONENT';
}

export type BattleMode = 'COLLECTING' | 'EXECUTING';

export const BattleScreen = ({
	saveFile,
}: {
	saveFile: SaveFile;
}): JSX.Element => {
	const {
		activePokemonPerside,
		playerSide,
		opponentSide,
		handleAction,
		mode,
		selectAction,
		resetAction,
		availableActions,
		nextPlayerPokemonWithoutAction,
		opponentFetchStatus,
		playerFetchStatus,
		setMode,
		setPlayerSide,
	} = useBattleScreen(saveFile);

	const hasOpenSpots: boolean = !!(
		playerSide &&
		playerSide.field.length < activePokemonPerside &&
		playerSide.bench.length !== 0
	);

	if (opponentFetchStatus === 'error' || playerFetchStatus === 'error') {
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
									mode === 'COLLECTING' &&
									p.nextAction && (
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											{isBattleAttack(p.nextAction)
												? p.nextAction.move.name
												: p.nextAction.type}
											<IoIosCloseCircle
												style={{ height: '40px', width: '40px' }}
												onClick={() => resetAction(p.id)}
											/>
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
				<BattleScreenController
					nextPlayerPokemonWithoutAction={nextPlayerPokemonWithoutAction}
					mode={mode}
					playerSide={playerSide}
					availableActions={availableActions}
					hasOpenSpots={hasOpenSpots}
					handleAction={handleAction}
					selectAction={selectAction}
					setPlayerSide={setPlayerSide}
					setMode={setMode}
				/>
			</div>
		);
	}
	return <FetchingScreen />;
};
