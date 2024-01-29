import { getPokemonSpriteUrl } from '../../../functions/getPokemonSpriteUrl';
import './NameAndSpriteSection.css';

export const NameAndSpriteSection = ({
	dexId,
	name,
	nickname,
	owner,
	level,
}: {
	dexId: number;
	name: string;
	level: number;
	owner?: string;
	nickname?: string;
}): JSX.Element => {
	return (
		<div className="nameAndSpriteSection">
			<div>
				<h1>
					{name}{' '}
					{nickname && nickname !== name.toUpperCase() && (
						<span>: {nickname}</span>
					)}
				</h1>
				{owner && <h3>Trainer: {owner}</h3>}
				<h3>Level: {level}</h3>
			</div>
			<img className="sprite" src={getPokemonSpriteUrl(dexId)} />
		</div>
	);
};
