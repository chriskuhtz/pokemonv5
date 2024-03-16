import { ChooseItem } from '../../components/ChooseActionAndTarget/components/ChooseItem';
import { generateInventory } from '../../interfaces/Inventory';

export const TestArea = (): JSX.Element => {
	return (
		<div>
			<ChooseItem
				open={true}
				setItem={() => {}}
				inventory={generateInventory({
					potion: 5,
					'fresh-water': 5,
					antidote: 5,
					awakening: 10,
					'berry-juice': 1,
					'burn-heal': 4,
				})}
				resetActor={function (): void {
					throw new Error('Function not implemented.');
				}}
				availableTargets={[]}
			/>
		</div>
	);
};
