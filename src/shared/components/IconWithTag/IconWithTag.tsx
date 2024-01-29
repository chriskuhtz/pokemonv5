import './IconWithTag.css';

export const IconWithTag = ({
	src,
	tag,
	onClick,
}: {
	src: string;
	tag?: string | number;
	onClick?: () => void;
}): JSX.Element => {
	return (
		<div
			onClick={onClick}
			style={{ marginBottom: tag ? '-1.5rem' : undefined }}
		>
			<img className="icon" src={src} />
			{tag && <div className="tag">{tag}</div>}
		</div>
	);
};
