export const ErrorScreen = ({ text }: { text?: string }): JSX.Element => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100dvh',
			}}
		>
			<h1>{text ?? 'Something went wrong'}</h1>
		</div>
	);
};
