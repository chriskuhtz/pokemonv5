import React from 'react';
import { typeColors } from '../../../constants/typeColors';
import { Inventory } from '../../../interfaces/Inventory';
import { PokeballType, isPokeball } from '../../../interfaces/Item';
import { Modal } from '../../../ui_components/Modal/Modal';
import { Pill } from '../../../ui_components/Pill/Pill';

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
			<Modal
				open={true}
				onCancel={resetActor}
				modalTitle={`which type of ball:`}
				modalContent={
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr ',
							gap: '.5rem',
						}}
					>
						{Object.entries(inventory).map(([key, amount]) => {
							if (amount === 0 || !isPokeball(key)) {
								return <React.Fragment key={key + amount}></React.Fragment>;
							}
							return (
								<Pill
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
