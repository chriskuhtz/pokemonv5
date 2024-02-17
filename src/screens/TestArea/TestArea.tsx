import { ChooseAction } from '../../components/ChooseActionAndTarget/components/ChooseAction';
import { BattleAction, BattlePokemon } from '../../interfaces/BattlePokemon';

const pokemon: BattlePokemon = {
	id: '1cb7406e-2aab-488a-8f86-cff89e71334d',
	xp: 200,
	name: 'rattata',
	side: 'PLAYER',
	dexId: 19,
	maxHp: 19,
	attack: 11,
	damage: 5,
	onTeam: true,
	ownerId: 'opponent',
	base_experience: 51,
};

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
