import { useMemo } from 'react';
import { DexEntry } from '../../interfaces/DexEntry';

export const DexSummary = ({ dex }: { dex: DexEntry[] }) => {
	const { caught, seen } = useMemo(() => {
		return {
			caught: dex.filter((entry) => entry.status === 'owned').length,
			seen: dex.filter((entry) => entry.status === 'seen').length,
		};
	}, [dex]);
	return (
		<>
			<div>
				Caught: <strong>{caught}</strong>
			</div>
			<div>
				Seen: <strong>{seen}</strong>
			</div>
		</>
	);
};
