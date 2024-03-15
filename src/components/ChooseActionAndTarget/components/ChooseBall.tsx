import { IoIosCloseCircle } from 'react-icons/io';
import { typeColors } from '../../../constants/typeColors';
import { Inventory } from '../../../interfaces/Inventory';
import { PokeballType, isPokeball } from '../../../interfaces/Item';
import { Banner } from '../../../ui_components/Banner/Banner';
import { Slanted } from '../../../ui_components/Slanted/Slanted';

export const ChooseBall = ({
	open,
	setBall,
	inventory,
	resetActor,
}: {
	open: boolean;
	setBall: (x: PokeballType | undefined) => void;
	inventory: Inventory;
	resetActor: () => void;
}) => {
	if (open) {
		return (
			<Banner
				content={
					<div style={{ textAlign: 'left' }}>
						<strong>{`which type of ball:`}</strong>
						<div
							style={{
								display: 'flex',
								alignItems: 'stretch',
								justifyContent: 'space-evenly',
								gap: '1rem',
							}}
						>
							{Object.entries(inventory).map(([key, amount]) => {
								if (amount === 0 || !isPokeball(key)) {
									return <></>;
								}
								return (
									<Slanted
										style={{
											flexGrow: 1,
											border: '1px solid',
											backgroundColor: 'var(--main-bg-color)',
											borderColor: typeColors['normal'],
										}}
										key={key + amount}
										onClick={() => {
											setBall(key);
										}}
										content={
											<div style={{ display: 'flex', gap: '0.5rem' }}>
												<img
													height={24}
													width={24}
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${key}.png`}
												/>
												{key} ({inventory[key]})
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
