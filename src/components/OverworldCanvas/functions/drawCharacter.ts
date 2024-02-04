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
	height: number;
	width: number;
}

export const drawCharacter = ({
	context,
	img,
	forwardFoot,
	orientation,
	x,
	y,
	height,
	width,
}: DrawCharacterProps): void => {
	const selectionOffsetX = 64 * forwardFoot;
	const selectionOffsetY = 64 * orientation;

	context.clearRect(x * size, y * size, width * size, height * size);
	context.drawImage(
		img,
		selectionOffsetX,
		selectionOffsetY,
		64,
		64,
		x * size,
		y * size,
		width * size,
		height * size
	);
};
