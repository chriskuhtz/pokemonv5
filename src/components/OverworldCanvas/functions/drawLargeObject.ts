import { size } from '../../../main';

export interface DrawLargeObjectProps {
	context: CanvasRenderingContext2D;
	img: HTMLImageElement;
	x: number;
	y: number;
	height: number;
	width: number;
}

export const drawLargeObject = ({
	context,
	img,
	x,
	y,
	height,
	width,
}: DrawLargeObjectProps): void => {
	context.clearRect(x, y, width * size, height * size);
	context.drawImage(img, x * size, y * size, width * size, height * size);
};
