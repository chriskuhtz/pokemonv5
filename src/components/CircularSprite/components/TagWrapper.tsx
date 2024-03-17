import React, { useEffect, useState } from 'react';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import '../CircularSprite.css';
import { useTags } from '../../../hooks/useTags';

export const TagWrapper = ({ pokemon }: { pokemon: BattlePokemon }) => {
	const tags = useTags(pokemon);

	const [shiftDegrees, setShiftDegrees] = useState<number>(0);

	useEffect(() => {
		//find the correct angles for n tags

		const rotator = setInterval(() => {
			setShiftDegrees(shiftDegrees + 0.5);
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
		}, 75);

		return () => clearInterval(rotator);
	}, [shiftDegrees, tags]);

	return (
		<div className="tagWrapper">
			{tags.map((tag, i) => (
				<React.Fragment key={i}>{tag}</React.Fragment>
			))}
		</div>
	);
};
