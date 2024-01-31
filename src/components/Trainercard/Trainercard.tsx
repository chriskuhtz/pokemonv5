import { useRotate } from '../../hooks/useRotate';
import { DexEntry } from '../../interfaces/DexEntry';
import { CharacterSprite } from '../CharacterSprite/CharacterSprite';
import { DexSummary } from '../DexSummary/DexSummary';
import './trainercard.css';

export interface TrainercardProps {
	name: string;
	sprite: string;
	money: number;
	dex?: DexEntry[];
}

export const Trainercard = ({ name, sprite, money, dex }: TrainercardProps) => {
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
			{dex && <DexSummary dex={dex} />}
		</div>
	);
};
