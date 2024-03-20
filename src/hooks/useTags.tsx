import { ReactNode, useMemo } from 'react';
import { TypeIcon } from '../components/TypeIcon/TypeIcon';
import { calculateLevelData } from '../functions/calculateLevelData';
import { PrimaryAilment, SecondaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PokemonType } from '../interfaces/PokemonType';

export const getAilmentTag = (ailment: PrimaryAilment | SecondaryAilment) => {
	let type: PokemonType | undefined = undefined;
	if (ailment.type === 'burn') {
		type = 'fire';
	}
	if (ailment.type === 'freeze') {
		type = 'ice';
	}
	if (ailment.type === 'paralysis') {
		type = 'electric';
	}
	if (ailment.type === 'poison' || ailment.type === 'toxic') {
		type = 'poison';
	}
	if (ailment.type === 'confusion') {
		type = 'psychic';
	}
	if (ailment.type === 'sleep') {
		type = 'dark';
	}
	if (type) {
		return <TypeIcon className="battleSpriteTag" type={type} size="40px" />;
	}

	return <></>;
};
export const useTags = (pokemon: BattlePokemon) => {
	return useMemo(() => {
		const { level } = calculateLevelData(pokemon.xp);
		const res: ReactNode[] = [`Lvl ${level}`];

		Object.entries(pokemon.statModifiers).forEach(([x, value]) => {
			if (value === 0) {
				return;
			}
			const sign = value > 0 ? '+' : '';

			res.push(`${sign}${value} ${x}`);
		});
		if (pokemon.evasiveness) {
			res.push(`eva: ${pokemon.evasiveness}`);
		}
		if (pokemon.accuracyModifier) {
			res.push(`accu: ${pokemon.accuracyModifier}`);
		}

		if (pokemon.primaryAilment) {
			res.push(getAilmentTag(pokemon.primaryAilment));
		}
		if (pokemon.preparedMove) {
			res.push(pokemon.preparedMove.moveName);
		}
		if (pokemon.recharging) {
			res.push('recharging');
		}
		if (pokemon.lockedInMove) {
			res.push(`locked into ${pokemon.lockedInMove.moveName}`);
		}
		if (pokemon.disabledMove) {
			res.push(`${pokemon.disabledMove.moveName} disabled`);
		}
		if (pokemon.location) {
			res.push(pokemon.location);
		}
		if (pokemon.multiHits) {
			res.push(`${pokemon.multiHits} hits remaining`);
		}
		pokemon.secondaryAilments?.forEach((a) => {
			if (a.type === 'confusion') {
				res.push(getAilmentTag(a));
			} else res.push(`${a.type}: ${a.duration} turns`);
		});
		if (pokemon.heldItemName) {
			res.push(
				<img
					className="battleSpriteTag"
					height={'40px'}
					width={'40px'}
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${pokemon.heldItemName}.png`}
				/>
			);
		}

		return res.map((tag) => {
			if (typeof tag === 'string') {
				return (
					<div
						key={tag}
						className={`battleSpriteTag ${tag.includes('-') && 'redTag'} ${
							tag.includes('+') && 'greenTag'
						}`}
					>
						<div>{tag}</div>
					</div>
				);
			}
			return tag;
		});
	}, [pokemon]);
};
