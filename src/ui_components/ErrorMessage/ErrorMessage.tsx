import { Pill } from '../Pill/Pill';
import './errorMessage.css';

export const ErrorMessage = ({
	message,
	log,
}: {
	message: string;
	log?: string;
}): JSX.Element => {
	if (log) {
		console.error(JSON.parse(log));
	}
	return <Pill className="errorMessage" center={message} />;
};
