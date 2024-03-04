import { ReactNode } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export const Collapse = ({
	open,
	setOpen,
	headline,
	content,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	headline: ReactNode;
	content: ReactNode;
}) => {
	return (
		<div>
			<h3 onClick={() => setOpen(!open)}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '1rem',
					}}
				>
					{headline}{' '}
					{open ? (
						<IoIosArrowUp size={'32px'} />
					) : (
						<IoIosArrowDown size={'32px'} />
					)}
				</div>
			</h3>
			{open && <div>{content}</div>}
		</div>
	);
};
