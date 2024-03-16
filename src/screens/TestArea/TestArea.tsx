import { ChooseBall } from '../../components/ChooseActionAndTarget/components/ChooseBall';
import { generateInventory } from '../../interfaces/Inventory';

export const TestArea = (): JSX.Element => {
	return (
		<div>
			<ChooseBall
				open={true}
				setBall={() => {}}
				inventory={generateInventory({
					'master-ball': 5,
					'poke-ball': 5,
					'ultra-ball': 5,
					'great-ball': 5,
					'safari-ball': 5,
					'net-ball': 5,
					'dive-ball': 5,
					'nest-ball': 5,
					'repeat-ball': 5,
					'timer-ball': 5,
					'luxury-ball': 5,
					'dusk-ball': 5,
					'heal-ball': 5,
					'quick-ball': 5,
					'cherish-ball': 5,
				})}
				resetActor={function (): void {
					throw new Error('Function not implemented.');
				}}
			/>
		</div>
	);
};
