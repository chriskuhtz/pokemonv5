import { ReactNode } from 'react';
import { Slanted } from '../Slanted/Slanted';
import './Banner.css';

export const Banner = ({
	content,
	onClick,
	bottom,
}: {
	content: ReactNode;
	onClick?: () => void;
	bottom?: boolean;
}): JSX.Element => {
	return (
		<div className={`banner ${bottom ? 'bottom' : ''}`} onClick={onClick}>
			<Slanted
				style={{
					backgroundColor: 'var(--main-bg-90)',
					width: '85%',
					padding: '1.5rem 2rem',
					fontSize: 'x-large',
				}}
				content={content}
			/>
		</div>
	);
};
