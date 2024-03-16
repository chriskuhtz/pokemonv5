import { CSSProperties, ReactNode } from 'react';
import './Slanted.css';

export const Slanted = ({
	content,
	onClick,
	style,
	disabled,
	className,
}: {
	content: ReactNode;
	onClick?: () => void;
	style?: CSSProperties;
	disabled?: boolean;
	className?: string;
}) => {
	return (
		<div
			style={style}
			className={`slanted ${className} ${disabled ? 'disabled' : ''}`}
			onClick={disabled ? () => {} : onClick}
		>
			{content}
		</div>
	);
};
