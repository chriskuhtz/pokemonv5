import { ChooseAction } from '../../components/ChooseActionAndTarget/components/ChooseAction';
import { BattleAction } from '../../interfaces/BattlePokemon';

export const TestArea = (): JSX.Element => {
	return (
		<div>
			<ChooseAction
				open={true}
				setActionName={function (x: BattleAction['type'] | undefined): void {
					console.log(x);
				}}
				availableActions={[
					{
						action: 'ATTACK',
						name: 'Attack',
						disabled: false,
					},
					{
						action: 'CATCH_ATTEMPT',
						name: 'Throw Pokeball',
						disabled: false,
					},
					{
						action: 'RUNAWAY_ATTEMPT',
						name: 'Run Away',
						disabled: false,
					},
					{
						action: 'SWITCH',
						name: 'Switch',
						disabled: true,
					},
				]}
				name={'Bollo'}
			/>
		</div>
	);
};
