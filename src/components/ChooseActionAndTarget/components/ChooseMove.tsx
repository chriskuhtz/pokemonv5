import { IoIosCloseCircle } from 'react-icons/io';
import { typeColors } from '../../../constants/typeColors';
import { getPPByIndex } from '../../../functions/getPPByIndex';
import { MoveDto } from '../../../interfaces/Move';
import { UsedPowerPoints } from '../../../interfaces/OwnedPokemon';
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
	usedPP,
}: {
	usedPP: UsedPowerPoints;
	open: boolean;
	setMove: (x: MoveDto | undefined) => void;
	availableMoves: SelectableAction[];
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
							{availableMoves.map((a, i) => (
								<Slanted
									style={{
										flexGrow: 1,
										border: '1px solid',
										backgroundColor: 'var(--main-bg-color)',
										borderColor: typeColors[a.move?.type.name ?? 'normal'],
									}}
									key={a.move?.name}
									disabled={
										a.disabled ||
										(a.move?.pp ?? 0) - getPPByIndex(usedPP, i) <= 0
									}
									onClick={() => {
										setMove(a.move);
									}}
									content={
										<div style={{ display: 'flex', gap: '0.5rem' }}>
											<TypeIcon
												size={'24px'}
												type={a.move?.type.name ?? 'normal'}
											/>
											{a.displayName} (
											{(a.move?.pp ?? 0) - getPPByIndex(usedPP, i)}/{a.move?.pp}
											)
										</div>
									}
								/>
							))}
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
