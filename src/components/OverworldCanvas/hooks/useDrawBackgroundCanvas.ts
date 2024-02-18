import { useCallback, useState } from 'react';
import { size } from '../../../main';
import { selectMap } from '../../../store/selectors/map/selectMap';
import { BaseTile } from '../../../store/slices/MapSlice';
import { useAppSelector } from '../../../store/storeHooks';
import { overworldCanvas } from '../OverworldCanvas';

const drawUniformBackground = (
	height: number,
	width: number,
	baseTile: BaseTile
) => {
	// console.log('draw background');
	const canvas: HTMLCanvasElement | null = document.querySelector(
		`#${overworldCanvas}`
	);
	// Initialize the GL context
	if (canvas) {
		const ctx = canvas.getContext('2d');

		// Only continue if WebGL is available and working
		if (ctx === null) {
			alert(
				'Unable to initialize 2d context. Your browser or machine may not support it.'
			);
			return;
		}

		const img = new Image();
		const heightArray: number[] = Array.from({ length: height });
		const widthArray: number[] = Array.from({ length: width });
		img.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) =>
					ctx.drawImage(img, 0, 0, 16, 16, size * x, size * y, size, size)
				)
			);
		};
		img.src = `tiles/${baseTile.id}1.png`;
	}
	return;
};
const drawCheckeredBackground = (
	height: number,
	width: number,
	baseTile: BaseTile
) => {
	// console.log('draw background');
	const canvas: HTMLCanvasElement | null = document.querySelector(
		`#${overworldCanvas}`
	);
	// Initialize the GL context
	if (canvas) {
		const ctx = canvas.getContext('2d');

		// Only continue if WebGL is available and working
		if (ctx === null) {
			alert(
				'Unable to initialize 2d context. Your browser or machine may not support it.'
			);
			return;
		}

		const img = new Image();
		const img2 = new Image();
		const heightArray: number[] = Array.from({ length: height });
		const widthArray: number[] = Array.from({ length: width });
		img.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if ((y + x) % 2 === 0) {
						ctx.drawImage(img, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img2.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if ((y + x) % 2 === 1) {
						ctx.drawImage(img2, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img.src = `tiles/${baseTile.id}1.png`;
		img2.src = `tiles/${baseTile.id}2.png`;
	}
	return;
};
const drawRandom3Background = (
	height: number,
	width: number,
	baseTile: BaseTile
) => {
	// console.log('draw background');
	const canvas: HTMLCanvasElement | null = document.querySelector(
		`#${overworldCanvas}`
	);
	// Initialize the GL context
	if (canvas) {
		const ctx = canvas.getContext('2d');

		// Only continue if WebGL is available and working
		if (ctx === null) {
			alert(
				'Unable to initialize 2d context. Your browser or machine may not support it.'
			);
			return;
		}

		const img = new Image();
		const img2 = new Image();
		const img3 = new Image();
		const heightArray: number[] = Array.from({ length: height });
		const widthArray: number[] = Array.from({ length: width });
		img.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0) {
						ctx.drawImage(img, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img2.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.33) {
						ctx.drawImage(img2, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img3.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.66) {
						ctx.drawImage(img3, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img.src = `tiles/${baseTile.id}1.png`;
		img2.src = `tiles/${baseTile.id}2.png`;
		img3.src = `tiles/${baseTile.id}3.png`;
	}
	return;
};
const drawRandom4Background = (
	height: number,
	width: number,
	baseTile: BaseTile
) => {
	// console.log('draw background');
	const canvas: HTMLCanvasElement | null = document.querySelector(
		`#${overworldCanvas}`
	);
	// Initialize the GL context
	if (canvas) {
		const ctx = canvas.getContext('2d');

		// Only continue if WebGL is available and working
		if (ctx === null) {
			alert(
				'Unable to initialize 2d context. Your browser or machine may not support it.'
			);
			return;
		}

		const img = new Image();
		const img2 = new Image();
		const img3 = new Image();
		const img4 = new Image();
		const heightArray: number[] = Array.from({ length: height });
		const widthArray: number[] = Array.from({ length: width });
		img.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0) {
						ctx.drawImage(img, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img2.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.25) {
						ctx.drawImage(img2, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img3.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.5) {
						ctx.drawImage(img3, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img4.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.75) {
						ctx.drawImage(img4, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img.src = `tiles/${baseTile.id}1.png`;
		img2.src = `tiles/${baseTile.id}2.png`;
		img3.src = `tiles/${baseTile.id}3.png`;
		img4.src = `tiles/${baseTile.id}4.png`;
	}
	return;
};
const drawRandom5Background = (
	height: number,
	width: number,
	baseTile: BaseTile
) => {
	// console.log('draw background');
	const canvas: HTMLCanvasElement | null = document.querySelector(
		`#${overworldCanvas}`
	);
	// Initialize the GL context
	if (canvas) {
		const ctx = canvas.getContext('2d');

		// Only continue if WebGL is available and working
		if (ctx === null) {
			alert(
				'Unable to initialize 2d context. Your browser or machine may not support it.'
			);
			return;
		}

		const img = new Image();
		const img2 = new Image();
		const img3 = new Image();
		const img4 = new Image();
		const img5 = new Image();
		const heightArray: number[] = Array.from({ length: height });
		const widthArray: number[] = Array.from({ length: width });
		img.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0) {
						ctx.drawImage(img, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img2.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.2) {
						ctx.drawImage(img2, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img3.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.4) {
						ctx.drawImage(img3, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img4.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.6) {
						ctx.drawImage(img4, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img5.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.8) {
						ctx.drawImage(img5, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img.src = `tiles/${baseTile.id}1.png`;
		img2.src = `tiles/${baseTile.id}2.png`;
		img3.src = `tiles/${baseTile.id}3.png`;
		img4.src = `tiles/${baseTile.id}4.png`;
		img5.src = `tiles/${baseTile.id}5.png`;
	}
	return;
};
const drawRandom6Background = (
	height: number,
	width: number,
	baseTile: BaseTile
) => {
	// console.log('draw background');
	const canvas: HTMLCanvasElement | null = document.querySelector(
		`#${overworldCanvas}`
	);
	// Initialize the GL context
	if (canvas) {
		const ctx = canvas.getContext('2d');

		// Only continue if WebGL is available and working
		if (ctx === null) {
			alert(
				'Unable to initialize 2d context. Your browser or machine may not support it.'
			);
			return;
		}

		const img = new Image();
		const img2 = new Image();
		const img3 = new Image();
		const img4 = new Image();
		const img5 = new Image();
		const img6 = new Image();
		const heightArray: number[] = Array.from({ length: height });
		const widthArray: number[] = Array.from({ length: width });
		img.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0) {
						ctx.drawImage(img, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img2.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.16) {
						ctx.drawImage(img2, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img3.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.33) {
						ctx.drawImage(img3, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img4.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.5) {
						ctx.drawImage(img4, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img5.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.66) {
						ctx.drawImage(img5, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img6.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if (Math.random() > 0.83) {
						ctx.drawImage(img6, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img.src = `tiles/${baseTile.id}1.png`;
		img2.src = `tiles/${baseTile.id}2.png`;
		img3.src = `tiles/${baseTile.id}3.png`;
		img4.src = `tiles/${baseTile.id}4.png`;
		img5.src = `tiles/${baseTile.id}5.png`;
		img6.src = `tiles/${baseTile.id}5.png`;
	}
	return;
};

export const useDrawBackGroundCanvas = () => {
	const [valid, setValid] = useState<boolean>(false);
	const { height, width, baseTile } = useAppSelector(selectMap);

	return useCallback(() => {
		if (valid) {
			return;
		}
		if (baseTile.pattern === 'uniform') {
			drawUniformBackground(height, width, baseTile);
		}
		if (baseTile.pattern === 'checkered') {
			drawCheckeredBackground(height, width, baseTile);
		}
		if (baseTile.pattern === 'random3') {
			drawRandom3Background(height, width, baseTile);
		}
		if (baseTile.pattern === 'random4') {
			drawRandom4Background(height, width, baseTile);
		}
		if (baseTile.pattern === 'random5') {
			drawRandom5Background(height, width, baseTile);
		}
		if (baseTile.pattern === 'random6') {
			drawRandom6Background(height, width, baseTile);
		}
		setValid(true);
		console.error('what is this basetile');
	}, [baseTile, height, valid, width]);
};
