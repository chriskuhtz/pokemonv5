import { ReactNode } from 'react';
import './Tag.css';

export const Tag = ({
	tag,
	children,
	color,
}: {
	tag?: ReactNode;
	children: ReactNode;
	color?: string;
}) => {
	if (!tag) {
		return children;
	}
	return (
		<div>
			<div style={{ backgroundColor: color ?? 'red' }} className="tag">
				{tag}
			</div>
			<div>{children}</div>
		</div>
	);
};
