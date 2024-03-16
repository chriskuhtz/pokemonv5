import { IoIosCloseCircle } from 'react-icons/io';
import { typeColors } from '../../../constants/typeColors';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import {
	HealingItemType,
	PPRestoringItemType,
	isHealingItem,
	isPPRestorationItem,
} from '../../../interfaces/Item';
import { Banner } from '../../../ui_components/Banner/Banner';
import { Slanted } from '../../../ui_components/Slanted/Slanted';

export const ChooseItem = ({
	open,
	setItem,
	inventory,
	resetActor,
	availableTargets,
}: {
	open: boolean;
	setItem: (x: HealingItemType | PPRestoringItemType | undefined) => void;
	inventory: Inventory;
	resetActor: () => void;
	availableTargets: BattlePokemon[];
}) => {
	if (open) {
		return (
			<Banner
				content={
					<div style={{ textAlign: 'left' }}>
						<strong>{`which item:`}</strong>
						<div
							style={{
								display: 'flex',
								alignItems: 'stretch',
								justifyContent: 'space-evenly',
								gap: '1rem',
							}}
						>
							{Object.entries(inventory).map(([key, amount]) => {
								if (
									amount === 0 ||
									(!isHealingItem(key) && !isPPRestorationItem(key))
								) {
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
										disabled={availableTargets.every(
											(t) => !canBenefitFromItem(t, key)
										)}
										key={key + amount}
										onClick={() => {
											setItem(key);
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
