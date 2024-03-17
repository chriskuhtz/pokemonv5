import {
	IoIosAddCircle,
	IoIosCloseCircle,
	IoIosRemoveCircle,
} from 'react-icons/io';

export const AmountHandler = ({
	amount,
	setAmount,
	canIncrease = true,
	canReduce = true,
	canReset = true,
	displayZero = true,
}: {
	amount: number;
	setAmount: (x: number) => void;

	canIncrease?: boolean;
	canReduce?: boolean;
	canReset?: boolean;
	displayZero?: boolean;
}) => {
	const iconSize = '2rem';
	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			{canIncrease && (
				<IoIosAddCircle
					style={{ height: iconSize, width: iconSize }}
					onClick={() => setAmount(amount + 1)}
				/>
			)}

			{amount > 0 || displayZero ? (
				<strong style={{ fontSize: '1.5rem', padding: '0 1rem' }}>
					{amount}
				</strong>
			) : undefined}

			{amount > 0 && canReduce && (
				<IoIosRemoveCircle
					style={{ height: iconSize, width: iconSize }}
					onClick={() => setAmount(amount - 1)}
				/>
			)}

			{amount > 0 && canReset && (
				<IoIosCloseCircle
					style={{ height: iconSize, width: iconSize }}
					onClick={() => setAmount(0)}
				/>
			)}
		</div>
	);
};
