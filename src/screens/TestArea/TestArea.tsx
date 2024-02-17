import { BattleSprite } from '../../components/BattleSprite/BattleSprite';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { BattlePill } from '../BattleScreen/components/BattlePill/BattlePill';

const pokemon: BattlePokemon = {
	id: '1cb7406e-2aab-488a-8f86-cff89e71334d',
	xp: 200,
	name: 'rattata',
	side: 'PLAYER',
	dexId: 19,
	maxHp: 19,
	attack: 11,
	damage: 0,
	onTeam: true,
	ownerId: 'opponent',
	base_experience: 51,
};

export const TestArea = (): JSX.Element => {
	return (
		<div>
			<BattlePill pokemon={pokemon} />
			<BattlePill pokemon={{ ...pokemon, status: 'BEING_CAUGHT' }} />
			<div style={{ display: 'flex' }}>
				<BattleSprite pokemon={pokemon} />
				<BattleSprite pokemon={{ ...pokemon, status: 'BEING_CAUGHT' }} />
				<BattleSprite pokemon={pokemon} back active />
				<BattleSprite pokemon={pokemon} active />
				<BattleSprite pokemon={pokemon} active overlay={'HEllo'} />
			</div>
		</div>
	);
};
