import { ReactNode } from 'react';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { BattleSide } from '../../screens/BattleScreen/interfaces/battleScreenInterfaces';
import { Pill } from '../../ui_components/Pill/Pill';
import './battlePill.css';

export const BattlePill = ({
	pokemon,
	onClick,
	rightSide,
	side,
}: {
	pokemon: BattlePokemon;
	onClick?: () => void;
	rightSide?: ReactNode;
	side: BattleSide;
}): JSX.Element => {
	return (
		<Pill
			leftSide={
				<img src={getPokemonSpriteUrl(pokemon.dexId, side === 'PLAYER')} />
			}
			center={
				<div>
					<p>{pokemon.name}</p>
					<p>
						{pokemon.maxHp - pokemon.damage}/{pokemon.maxHp}
					</p>
				</div>
			}
			rightSide={rightSide}
			onClick={onClick}
		/>
	);
};
