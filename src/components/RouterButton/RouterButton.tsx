import { useNavigate } from 'react-router-dom';
import { Pill } from '../../ui_components/Pill/Pill';
import { ReactNode } from 'react';

export interface RouterButtonProps {
	to: string;
	text: ReactNode;
	sideEffect?: () => void;
	className?: string;
	style?: React.CSSProperties;
}
export const RouterButton = ({
	sideEffect,
	to,
	text,
	className,
	style,
}: RouterButtonProps): JSX.Element => {
	const navigate = useNavigate();
	return (
		<Pill
			className={`${className} hoverEffect`}
			style={{ ...style, zIndex: 'var(--BUTTONS_INDEX' }}
			center={text}
			onClick={() => {
				if (sideEffect) {
					sideEffect();
				}
				navigate(to);
			}}
		/>
	);
};
