export type RequestState = 'uninitialized' | 'loading' | 'success' | 'error';

export const RequestStateDisplay = ({
	requestState,
}: {
	requestState: RequestState;
}) => {
	if (requestState === 'uninitialized') {
		return <div>Uninitialized</div>;
	}
	if (requestState === 'loading') {
		return <div>Loading</div>;
	}
	return <div>Error</div>;
};
