import { useRotate } from '../../hooks/useRotate';
import { DexEntry } from '../../interfaces/DexEntry';
import { GymBadgeRecord } from '../../interfaces/SaveFile';
import { CharacterSprite } from '../CharacterSprite/CharacterSprite';
import { DexSummary } from '../DexSummary/DexSummary';
import './trainercard.css';

export interface TrainercardProps {
	name: string;
	sprite: string;
	money: number;
	dex?: DexEntry[];
	badges: GymBadgeRecord;
}

export const Trainercard = ({
	name,
	sprite,
	money,
	dex,
	badges,
}: TrainercardProps) => {
	const currentOrientation = useRotate();

	return (
		<div className="hoverEffect trainercard">
			<h2>Name:</h2>
			<h2> {name}</h2>
			<div>Sprite:</div>
			<CharacterSprite
				orientation={currentOrientation}
				index={sprite}
				style={{ '--size': '40px' } as React.CSSProperties}
			/>
			<div>Money:</div>
			<strong>{money}$</strong>
			<h3>Pokedex:</h3>
			<div id="gridPlaceholder" />
			{dex && <DexSummary dex={dex} />}
			<h3>Badges:</h3>
			<div id="gridPlaceholder" />
			{Object.entries(badges).map((badge) => {
				if (badge[1] === false) {
					return;
				}
				return <strong>{badge[0]}</strong>;
			})}
		</div>
	);
};
