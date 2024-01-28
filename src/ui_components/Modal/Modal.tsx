import { ReactNode } from 'react';
import { Pill } from '../Pill/Pill';
import './modal.css';
export const Modal = ({
	open,

	modalContent,
	modalTitle,

	onCancel,
}: {
	open: boolean;

	onCancel?: () => void;
	modalContent: ReactNode;
	modalTitle?: ReactNode;
}): JSX.Element => {
	if (!open) {
		return <></>;
	}
	return (
		<div className="modal">
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
				<div className="modalHeader">
					{modalTitle && <div>{modalTitle}</div>}
					{onCancel && <Pill onClick={onCancel} center={'X'} />}
				</div>

				{modalContent}
			</div>
		</div>
	);
};
