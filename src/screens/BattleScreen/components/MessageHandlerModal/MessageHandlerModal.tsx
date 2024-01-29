import { useCallback, useState } from 'react';
import { Modal } from '../../../../ui_components/Modal/Modal';
import { Pill } from '../../../../ui_components/Pill/Pill';

//might be the same as overworld dialogue
export const MessageHandlerModal = ({
	messages,
	handleNextSnapshot,
}: {
	messages?: string[];
	handleNextSnapshot: () => void;
}): JSX.Element => {
	const [index, setIndex] = useState<number>(0);

	const iterateThroughMessages = useCallback(() => {
		if (messages && index === messages?.length - 1) {
			handleNextSnapshot();
			setIndex(0);
		} else setIndex(index + 1);
	}, [handleNextSnapshot, index, messages]);
	if (!messages) {
		return <></>;
	}

	return (
		<Modal
			open={!!messages}
			modalContent={
				<Pill onClick={iterateThroughMessages} center={messages[index]} />
			}
		/>
	);
};
