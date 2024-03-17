import { ReactNode } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
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
				<div className="modalContent">
					{' '}
					<div className="modalHeader">
						{modalTitle && <h3>{modalTitle}</h3>}
						{onCancel && (
							<IoIosCloseCircle
								style={{ height: '40px', width: '40px' }}
								onClick={onCancel}
							/>
						)}
					</div>
					{modalContent}
				</div>
			</div>
		</div>
	);
};
