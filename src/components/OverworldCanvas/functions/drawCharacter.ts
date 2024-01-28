import { ForwardFootEnum } from '../../../interfaces/ForwardFoot';
import { OrientationEnum } from '../../../interfaces/Orientation';

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
	const rectangleSize = 64;
	const selectionOffsetX = rectangleSize * forwardFoot;
	const selectionOffsetY = rectangleSize * orientation;

	context.clearRect(x, y, rectangleSize, rectangleSize);
	context.drawImage(
		img,
		selectionOffsetX,
		selectionOffsetY,
		rectangleSize,
		rectangleSize,
		x,
		y,
		rectangleSize,
		rectangleSize
	);
};
