import { BattleSprite } from '../../components/BattleSprite/BattleSprite';
import { BattlePokemon } from '../../interfaces/BattlePokemon';

const testmon: BattlePokemon = {
	id: '9517d3ef-84ec-44ef-bd75-14345e54fb27',
	xp: 100,
	name: 'bulbasaur',
	side: 'PLAYER',
	dexId: 1,
	maxHp: 19,
	attack: 9,
	damage: 0,
	onTeam: true,
	ownerId: '1fd3d8bc-d40e-487c-bd35-ca96ad4b1b89',
	base_experience: 64,
};
const testmon2: BattlePokemon = {
	id: '9517d3ef-84ec-44ef-bd75-14345e54fb27',
	xp: 1000000,
	name: 'bulbasaur',
	side: 'PLAYER',
	dexId: 151,
	maxHp: 19,
	attack: 9,
	damage: 0,
	onTeam: true,
	ownerId: '1fd3d8bc-d40e-487c-bd35-ca96ad4b1b89',
	base_experience: 64,
};
export const TestArea = (): JSX.Element => {
	return (
		<div style={{ padding: '2rem', display: 'flex' }}>
			<BattleSprite pokemon={testmon} />
			<BattleSprite pokemon={testmon} overlay={'Acting'} />
			<BattleSprite pokemon={testmon2} />
			<BattleSprite pokemon={testmon2} overlay={'Acting'} />
		</div>
	);
};
