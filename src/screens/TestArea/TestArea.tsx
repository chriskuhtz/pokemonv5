import { useState } from 'react';
import { AmountHandler } from '../../ui_components/AmountHandler/AmountHandler';

export const TestArea = (): JSX.Element => {
	const [amount, setAmount] = useState<number>(0);
	return (
		<div>
			<AmountHandler
				amount={amount}
				setAmount={setAmount}
				canIncrease
				canReduce={false}
				canReset
			/>
		</div>
	);
};
