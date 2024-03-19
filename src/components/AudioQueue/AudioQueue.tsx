import { selectNextAudio } from '../../store/selectors/audio/selectNextAudio';
import { removeFirstAudio } from '../../store/slices/audioSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';

export const AudioQueue = (): JSX.Element => {
	const audio = useAppSelector(selectNextAudio);
	const dispatch = useAppDispatch();

	return (
		<audio
			key={audio ?? Math.random()}
			autoPlay={true}
			onEndedCapture={() => dispatch(removeFirstAudio())}
			onEnded={() => dispatch(removeFirstAudio())}
		>
			<source src={audio} type="audio/ogg" />
			Your browser does not support the audio element.
		</audio>
	);
};
