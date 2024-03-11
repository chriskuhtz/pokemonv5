import { useEffect, useMemo } from 'react';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import '../CircularSprite.css';

export const TagWrapper = ({ pokemon }: { pokemon: BattlePokemon }) => {
	const tags: string[] = useMemo(() => {
		const { level } = calculateLevelData(pokemon.xp);
		const res: string[] = [`Lvl ${level}`];

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
			res.push(pokemon.primaryAilment.type.slice(0, 4));
		}
		if (pokemon.preparedMove) {
			res.push(pokemon.preparedMove);
		}
		if (pokemon.location) {
			res.push(pokemon.location);
		}
		if (pokemon.multiHits) {
			res.push(`${pokemon.multiHits} hits remaining`);
		}
		pokemon.secondaryAilments?.forEach((a) => {
			res.push(`${a.type}: ${a.duration} turns`);
		});

		return res;
	}, [pokemon]);

	useEffect(() => {
		//find the correct angles for n tags
		document.querySelectorAll('.tagWrapper').forEach((tagWrapper) => {
			const circles = tagWrapper.querySelectorAll('.battleSpriteTag');
			let angle = 360 - 90;
			const dangle = 360 / circles.length;
			for (let i = 0; i < circles.length; ++i) {
				const circle = circles[i] as HTMLElement;
				angle += dangle;
				circle.style.transform = `rotate(${angle}deg) translate(${
					tagWrapper.clientWidth / 2
				}px) rotate(-${angle}deg)`;
			}
		});
	}, [pokemon]);

	return (
		<div className="tagWrapper">
			{tags.map((tag) => (
				<div
					key={tag}
					className={`battleSpriteTag ${tag.includes('-') && 'redTag'} ${
						tag.includes('+') && 'greenTag'
					}`}
				>
					<div>{tag}</div>
				</div>
			))}
		</div>
	);
};
