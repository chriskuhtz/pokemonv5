import { ReactNode } from 'react';
import './pill.css';

export const Pill = ({
	leftSide,
	center,
	rightSide,
	onClick,
	disabled,
	className,
	style,
	selected,
}: {
	leftSide?: ReactNode;
	center?: ReactNode;
	rightSide?: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	selected?: boolean;
	className?: string;
	style?: React.CSSProperties;
}) => {
	const handleClick = () => {
		if (onClick && !disabled) {
			onClick();
		}
	};
	return (
		<div
			className={`pill ${disabled ? 'disabled' : undefined} ${
				selected ? 'selected' : undefined
			} ${className}`}
			onClick={handleClick}
			style={style}
		>
			<div>{leftSide}</div>
			<div>{center}</div>
			<div>{rightSide}</div>
		</div>
	);
};
