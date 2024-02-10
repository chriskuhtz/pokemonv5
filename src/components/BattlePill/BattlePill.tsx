import { ReactNode } from 'react';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { Combatant } from '../../interfaces/Combatant';
import { Pill } from '../../ui_components/Pill/Pill';
import { MapObject } from '../MapObject/MapObject';
import './battlePill.css';

export const BattlePill = ({
	pokemon,
	onClick,
	rightSide,
	battleStatus,
	battleState,
}: {
	pokemon: BattlePokemon;
	onClick?: () => void;
	rightSide?: ReactNode;
	battleStatus?: Combatant['status'];
	battleState?: Combatant['state'];
}): JSX.Element => {
	return (
		<Pill
			leftSide={
				battleState === 'CATCHING' ||
				battleState === 'CAUGHT' ||
				battleState === 'WITHDRAWING' ? (
					<MapObject
						className={battleState === 'CATCHING' ? 'shaking' : undefined}
						style={{ height: '40px' }}
						id="pokeball"
					/>
				) : (
					<img src={getPokemonSpriteUrl(pokemon.dexId)} />
				)
			}
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
