import { useNavigate } from 'react-router-dom';
import { Pill } from '../../ui_components/Pill/Pill';

export interface RouterButtonProps {
	to: string;
	text: string;
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
			className={className}
			style={style}
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
