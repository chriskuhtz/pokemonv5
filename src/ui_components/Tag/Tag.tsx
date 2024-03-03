import { ReactNode } from 'react';
import './Tag.css';

export const Tag = ({
	tag,
	children,
}: {
	tag?: ReactNode;
	children: ReactNode;
}) => {
	if (!tag) {
		return children;
	}
	return (
		<div>
			<div className="tag">{tag}</div>
			<div>{children}</div>
		</div>
	);
};
