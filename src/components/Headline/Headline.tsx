import { ReactNode } from 'react';
import { RouterButton, RouterButtonProps } from '../RouterButton/RouterButton';
import './Headline.css';

export interface HeadlineProps {
	text: ReactNode;
	routerButtonProps?: RouterButtonProps;
	className?: string;
	style?: React.CSSProperties;
	rightElement?: ReactNode;
}
export const Headline = ({
	text,
	routerButtonProps,
	className,
	style,
	rightElement,
}: HeadlineProps): JSX.Element => {
	return (
		<div className={`headline ${className}`} style={style}>
			{routerButtonProps && (
				<RouterButton
					to={routerButtonProps.to}
					text={routerButtonProps.text}
					sideEffect={routerButtonProps.sideEffect}
				/>
			)}
			<h1 className="headline-mainText">{text}</h1>
			<div className="headline-rightElement">{rightElement}</div>
		</div>
	);
};
