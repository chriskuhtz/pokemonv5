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
			<Slanted className={'bannerContentWrapper'} content={content} />
		</div>
	);
};
