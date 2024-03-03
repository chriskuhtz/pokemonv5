import { CSSProperties, ReactNode } from 'react';
import './Slanted.css';

export const Slanted = ({
	content,
	onClick,
	style,
	disabled,
}: {
	content: ReactNode;
	onClick?: () => void;
	style?: CSSProperties;
	disabled?: boolean;
}) => {
	return (
		<div
			style={style}
			className={`slanted ${disabled ? 'disabled' : ''}`}
			onClick={disabled ? () => {} : onClick}
		>
			{content}
		</div>
	);
};
