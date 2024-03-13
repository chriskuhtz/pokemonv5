import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill } from '../../ui_components/Pill/Pill';

export interface RouterButtonProps {
	to: string;
	text: ReactNode;
	sideEffect?: () => void;
	className?: string;
	style?: React.CSSProperties;
	leftSide?: ReactNode;
	rightSide?: ReactNode;
}
export const RouterButton = ({
	sideEffect,
	to,
	text,
	className,
	style,
	leftSide,
	rightSide,
}: RouterButtonProps): JSX.Element => {
	const navigate = useNavigate();
	return (
		<Pill
			className={`${className} hoverEffect`}
			style={{ ...style, zIndex: 'var(--BUTTONS_INDEX' }}
			center={text}
			leftSide={leftSide}
			rightSide={rightSide}
			onClick={() => {
				if (sideEffect) {
					sideEffect();
				}
				navigate(to);
			}}
		/>
	);
};
