import { useRotate } from '../../hooks/useRotate';
import { CharacterSprite } from '../CharacterSprite/CharacterSprite';
import './trainercard.css';

export interface TrainercardProps {
	name: string;
	sprite: string;
	money: number;
}

export const Trainercard = ({ name, sprite, money }: TrainercardProps) => {
	const currentOrientation = useRotate();

	return (
		<div className="trainercard">
			<h2>Name:</h2>
			<h2> {name}</h2>
			<div>Sprite:</div>
			<CharacterSprite orientation={currentOrientation} index={sprite} />
			<div>Money:</div>
			<div>{money}</div>
		</div>
	);
};
