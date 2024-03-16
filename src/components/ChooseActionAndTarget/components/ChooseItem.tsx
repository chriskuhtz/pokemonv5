import React from 'react';
import { typeColors } from '../../../constants/typeColors';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import {
	HealingItemType,
	PPRestoringItemType,
	XItemType,
	isHealingItem,
	isPPRestorationItem,
	isXItem,
} from '../../../interfaces/Item';
import { Modal } from '../../../ui_components/Modal/Modal';
import { Pill } from '../../../ui_components/Pill/Pill';

export const ChooseItem = ({
	open,
	setItem,
	inventory,
	resetActor,
	availableTargets,
}: {
	open: boolean;
	setItem: (
		x: HealingItemType | PPRestoringItemType | XItemType | undefined
	) => void;
	inventory: Inventory;
	resetActor: () => void;
	availableTargets: BattlePokemon[];
}) => {
	if (open) {
		return (
			<Modal
				open={true}
				onCancel={resetActor}
				modalTitle={`which item:`}
				modalContent={
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr',
							gap: '.5rem',
						}}
					>
						{Object.entries(inventory).map(([key, amount]) => {
							if (
								amount === 0 ||
								(!isHealingItem(key) &&
									!isPPRestorationItem(key) &&
									!isXItem(key))
							) {
								return <React.Fragment key={key}></React.Fragment>;
							}
							return (
								<Pill
									style={{
										flexGrow: 1,
										border: '1px solid',
										backgroundColor: 'var(--main-bg-color)',
										borderColor: typeColors['normal'],
										minWidth: '25%',
									}}
									disabled={availableTargets.every(
										(t) => !canBenefitFromItem(t, key)
									)}
									key={key + amount}
									onClick={() => {
										setItem(key);
									}}
									rightSide={
										<img
											height={24}
											width={24}
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${key}.png`}
										/>
									}
									center={
										<div style={{ display: 'flex', gap: '0.5rem' }}>
											{key} ({inventory[key]})
										</div>
									}
								/>
							);
						})}
					</div>
				}
			/>
		);
	}
	return <></>;
};
