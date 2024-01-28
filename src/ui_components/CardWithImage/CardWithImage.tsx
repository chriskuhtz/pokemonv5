import './CardWithImage.css';

export const CardWithImage = ({
	url,
	title,
	subtitle,
	onClick,
}: {
	url: string;
	subtitle?: string;
	title: string;
	onClick: () => void;
}) => {
	return (
		<div className="cardWithImage" onClick={onClick}>
			<img className="image" src={url} />

			<h3 className="title">{title}</h3>
			<p className="subtitle">{subtitle}</p>
		</div>
	);
};
