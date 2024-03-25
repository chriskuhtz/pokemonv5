import { CSSProperties } from 'react';

export const FilterButtons = ({
	title,
	options,
	selected,
	setSelected,
	style,
}: {
	title: string;
	options: string[];
	selected: string | undefined;
	setSelected: (x: string | undefined) => void;
	style?: CSSProperties;
}): JSX.Element => {
	return (
		<div
			style={{
				...style,
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
						key={option}
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
