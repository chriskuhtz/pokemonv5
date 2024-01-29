import { ReactNode } from 'react';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { Combatant } from '../../interfaces/Combatant';
import { Pokemon } from '../../interfaces/Pokemon';
import { Pill } from '../../ui_components/Pill/Pill';

export const BattlePill = ({
	pokemon,
	onClick,
	rightSide,
	battleStatus,
}: {
	pokemon: Pokemon;
	onClick?: () => void;
	rightSide?: ReactNode;
	battleStatus?: Combatant['status'];
}): JSX.Element => {
	return (
		<Pill
			leftSide={<img src={getPokemonSpriteUrl(pokemon.dexId)} />}
			center={
				<div>
					<p>
						{pokemon.name}({battleStatus})
					</p>
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
