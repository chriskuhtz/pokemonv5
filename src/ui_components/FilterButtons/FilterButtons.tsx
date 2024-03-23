export const FilterButtons = ({
	title,
	options,
	selected,
	setSelected,
}: {
	title: string;
	options: string[];
	selected: string | undefined;
	setSelected: (x: string | undefined) => void;
}): JSX.Element => {
	return (
		<div
			style={{
				display: 'flex',
				gap: '.5rem',
				alignItems: 'center',
				flexWrap: 'wrap',
			}}
		>
			<strong>{title}:</strong>
			<div
				style={{
					display: 'flex',
					gap: '.5rem',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				{' '}
				{options.map((option) => (
					<button
						style={option === selected ? { backgroundColor: 'green' } : {}}
						onClick={() => {
							if (option !== selected) {
								setSelected(option);
							} else setSelected(undefined);
						}}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
};
