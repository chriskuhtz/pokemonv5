import { ReactNode } from 'react';

export const TwoByXGrid = ({ children }: { children: ReactNode }) => {
	return (
		<div
			style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}
		>
			{children}
		</div>
	);
};
