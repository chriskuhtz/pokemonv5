import { CSSProperties, ReactNode } from 'react';
import './Slanted.css';

export const Slanted = ({
	content,
	onClick,
	style,
}: {
	content: ReactNode;
	onClick?: () => void;
	style?: CSSProperties;
}) => {
	return (
		<div style={style} className="slanted" onClick={onClick}>
			{content}
		</div>
	);
};
