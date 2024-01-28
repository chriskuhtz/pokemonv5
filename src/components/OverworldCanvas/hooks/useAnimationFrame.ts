import { useCallback, useEffect, useRef } from 'react';

export const useAnimationFrame = (
	animationHandler: () => void,
	fps: number
) => {
	const frame = useRef(0);
	// keep track of last performed animation time
	const lastFrameTime = useRef(performance.now());

	// calculate animation frames minimum time step
	const fpsInterval = 1000 / fps;

	const animate = useCallback(() => {
		const now = performance.now();
		const elapsed = now - lastFrameTime.current;

		// only perform animation if elapsed time interval is more then animation step
		if (elapsed > fpsInterval) {
			animationHandler();
			// and in case of performed animation keep track of it's timestamp
			lastFrameTime.current = now;
		}

		frame.current = requestAnimationFrame(animate);
	}, [animationHandler, fpsInterval]);

	useEffect(() => {
		//console.log('animationFrame', lastFrameTime.current);
		frame.current = requestAnimationFrame(animate);

		// kill animation cycle on component unmount
		return () => cancelAnimationFrame(frame.current);
		// start animation on first render
	}, [animate]);
};
