import { useState } from 'react';
import { Collapse } from '../../ui_components/Collapse/Collapse';

export const TestArea = (): JSX.Element => {
	const [open, setOpen] = useState(false);
	return (
		<div
			style={{
				padding: '5rem 2rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Collapse
				open={open}
				setOpen={setOpen}
				headline={'YAYAYA'}
				content={<div>BULLU</div>}
			/>
		</div>
	);
};
