import './Banner.css';

export const Banner = ({
	text,
	onClick,
	bottom,
}: {
	text: string;
	onClick: () => void;
	bottom?: boolean;
}): JSX.Element => {
	return (
		<div className={`banner ${bottom ? 'bottom' : ''}`} onClick={onClick}>
			<div className="bannerLeftSection" />
			<div className="bannerLeftSlant" />
			<div>{text}</div>
			<div className="bannerRightSlant" />
			<div className="bannerRightSection" />
		</div>
	);
};
