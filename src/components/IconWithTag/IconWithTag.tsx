import { CSSProperties } from 'react';
import './IconWithTag.css';

export const IconWithTag = ({
	src,
	tag,
	onClick,
	style,
}: {
	src: string;
	tag?: string | number;
	onClick?: () => void;
	style?: CSSProperties;
}): JSX.Element => {
	return (
		<div
			onClick={onClick}
			style={{ ...style, marginBottom: tag ? '-1.5rem' : undefined }}
		>
			<img className="iconWithTag" src={src} />
			{tag && <div className="iconTag">{tag}</div>}
		</div>
	);
};
