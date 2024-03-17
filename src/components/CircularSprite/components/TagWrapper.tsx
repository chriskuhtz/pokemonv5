import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import '../CircularSprite.css';

export const TagWrapper = ({ pokemon }: { pokemon: BattlePokemon }) => {
	const tags: ReactNode[] = useMemo(() => {
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
			res.push(pokemon.primaryAilment.type.slice(0, 4));
		}
		if (pokemon.preparedMove) {
			res.push(pokemon.preparedMove.moveName);
		}
		if (pokemon.lockedInMove) {
			res.push(`locked into ${pokemon.lockedInMove.moveName}`);
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

	const [shiftDegrees, setShiftDegrees] = useState<number>(0);

	useEffect(() => {
		const rotator = setInterval(() => {
			setShiftDegrees(shiftDegrees + 0.5);
		}, 75);

		return () => clearInterval(rotator);
	}, [shiftDegrees, setShiftDegrees]);

	useEffect(() => {
		//find the correct angles for n tags
		document.querySelectorAll('.tagWrapper').forEach((tagWrapper) => {
			const circles = tagWrapper.querySelectorAll('.battleSpriteTag');
			let angle = 360 - 90 + shiftDegrees;
			const dangle = 360 / circles.length;
			for (let i = 0; i < circles.length; ++i) {
				const circle = circles[i] as HTMLElement;
				angle += dangle;
				circle.style.transform = `rotate(${angle}deg) translate(${
					tagWrapper.clientWidth / 2
				}px) rotate(-${angle}deg)`;
			}
		});

		return () => {};
	}, [shiftDegrees, tags]);

	return (
		<div className="tagWrapper">
			{tags.map((tag, i) => (
				<React.Fragment key={i}>{tag}</React.Fragment>
			))}
		</div>
	);
};
