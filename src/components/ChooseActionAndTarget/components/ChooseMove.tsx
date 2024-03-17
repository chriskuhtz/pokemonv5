import { IoIosCloseCircle } from 'react-icons/io';
import { typeColors } from '../../../constants/typeColors';
import { getMaxPP } from '../../../functions/getMaxPP';
import { getUsedPPByIndex } from '../../../functions/getPPByIndex';
import { MoveDto } from '../../../interfaces/Move';
import {
	PPBoostedMove,
	UsedPowerPoints,
} from '../../../interfaces/OwnedPokemon';
import { SelectableAction } from '../../../interfaces/SelectableAction';
import { Banner } from '../../../ui_components/Banner/Banner';
import { Slanted } from '../../../ui_components/Slanted/Slanted';
import { TypeIcon } from '../../TypeIcon/TypeIcon';

export const ChooseMove = ({
	open,
	setMove,
	availableMoves,
	title,
	resetActor,
	boostedMoves,
	usedPP,
}: {
	usedPP: UsedPowerPoints;
	open: boolean;
	setMove: (x: MoveDto | undefined) => void;
	availableMoves: SelectableAction[];
	boostedMoves: PPBoostedMove[];
	title: string;
	resetActor: () => void;
}) => {
	if (open) {
		return (
			<Banner
				content={
					<div style={{ textAlign: 'left' }}>
						<strong>{title}</strong>
						<div
							style={{
								display: 'flex',
								alignItems: 'stretch',
								justifyContent: 'space-evenly',
								gap: '1rem',
							}}
						>
							{availableMoves.map((a, i) => {
								const maxPP = a.move ? getMaxPP(boostedMoves, a.move) : 0;
								const currentPP = maxPP - getUsedPPByIndex(usedPP, i);
								return (
									<Slanted
										style={{
											flexGrow: 1,
											border: '1px solid',
											backgroundColor: 'var(--main-bg-color)',
											borderColor: typeColors[a.move?.type.name ?? 'normal'],
										}}
										key={a.move?.name}
										disabled={a.disabled || currentPP <= 0}
										onClick={() => {
											setMove(a.move);
										}}
										content={
											<div style={{ display: 'flex', gap: '0.5rem' }}>
												<TypeIcon
													size={'24px'}
													type={a.move?.type.name ?? 'normal'}
												/>
												{a.displayName} ({currentPP}/{maxPP})
											</div>
										}
									/>
								);
							})}
							<IoIosCloseCircle
								style={{ height: '40px', width: '40px' }}
								onClick={resetActor}
							/>
						</div>
					</div>
				}
			/>
		);
	}
	return <></>;
};
