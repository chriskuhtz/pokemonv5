import { PokemonDbLink } from '../../../../components/PokemonDbLink/PokemonDbLink';
import { TypeIcon } from '../../../../components/TypeIcon/TypeIcon';
import { PokemonType } from '../../../../interfaces/PokemonType';
import './NameAndSpriteSection.css';

export const NameAndSpriteSection = ({
	dexId,
	name,
	nickname,
	owner,
	level,
	primaryType,
	secondaryType,
	shiny,
	friendship,
}: {
	dexId: number;
	name: string;
	level: number;
	owner?: string;
	nickname?: string;
	primaryType: PokemonType;
	secondaryType?: PokemonType;
	shiny?: boolean;
	friendship: number;
}): JSX.Element => {
	return (
		<div className="nameAndSpriteSection">
			<div>
				<h1>
					<div className="nameAndTypes">
						<TypeIcon type={primaryType} />
						{secondaryType && <TypeIcon type={secondaryType} />}
						{name}{' '}
						{nickname && nickname !== name.toUpperCase() && (
							<span>: {nickname}</span>
						)}
					</div>
				</h1>
				<h3>
					<PokemonDbLink dexId={dexId} />
				</h3>
				{owner && <h3>Trainer: {owner}</h3>}

				<h3>Level: {level}</h3>

				<h3>Friendship: {friendship}/255</h3>
			</div>
			<img
				className="sprite"
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
					shiny ? 'shiny/' : ''
				}${dexId}.png
        `}
			/>
		</div>
	);
};
