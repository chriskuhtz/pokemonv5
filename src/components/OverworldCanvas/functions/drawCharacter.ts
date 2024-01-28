import { ForwardFootEnum } from '../../../interfaces/ForwardFoot';
import { OrientationEnum } from '../../../interfaces/Orientation';
import { size } from '../../../main';

export interface DrawCharacterProps {
	context: CanvasRenderingContext2D;
	img: HTMLImageElement;
	x: number;
	y: number;
	orientation: OrientationEnum;
	forwardFoot: ForwardFootEnum;
}

export const drawCharacter = ({
	context,
	img,
	forwardFoot,
	orientation,
	x,
	y,
}: DrawCharacterProps): void => {
	const selectionOffsetX = 64 * forwardFoot;
	const selectionOffsetY = 64 * orientation;

	context.clearRect(x, y, size, size * 1.5);
	context.drawImage(
		img,
		selectionOffsetX,
		selectionOffsetY,
		64,
		64,
		x * size,
		y * size,
		size,
		size * 1.5
	);
};
