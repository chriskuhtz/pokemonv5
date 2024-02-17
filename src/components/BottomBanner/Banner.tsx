import { ReactNode } from 'react';
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
			<div className="bannerLeftSection" />
			<div className="bannerLeftSlant" />
			<div>{content}</div>
			<div className="bannerRightSlant" />
			<div className="bannerRightSection" />
		</div>
	);
};
