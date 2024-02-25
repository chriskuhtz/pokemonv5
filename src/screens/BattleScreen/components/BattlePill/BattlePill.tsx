import { ReactNode } from 'react';
import { MapObject } from '../../../../components/MapObject/MapObject';
import { calculateLevelData } from '../../../../functions/calculateLevelData';
import { getPokemonSpriteUrl } from '../../../../functions/getPokemonSpriteUrl';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { Pill } from '../../../../ui_components/Pill/Pill';
import './battlePill.css';

export const BattlePill = ({
	pokemon,
	onClick,
	rightSide,
	back,
}: {
	pokemon: BattlePokemon;
	onClick?: () => void;
	rightSide?: ReactNode;
	back?: boolean;
}): JSX.Element => {
	const { level } = calculateLevelData(pokemon.xp);
	return (
		<Pill
			leftSide={
				pokemon.status === 'BEING_CAUGHT' ? (
					<MapObject
						style={{ height: '40px' }}
						id="pokeball"
						className="shaking"
					/>
				) : (
					<img src={getPokemonSpriteUrl(pokemon.dexId, back)} />
				)
			}
			center={
				<div>
					<p>
						{pokemon.name} / Lvl {level}
					</p>
					<p>
						{pokemon.hp - pokemon.damage}/{pokemon.hp}
					</p>
				</div>
			}
			rightSide={rightSide}
			onClick={onClick}
		/>
	);
};
