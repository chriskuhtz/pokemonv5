import { Pill } from '../Pill/Pill';

export const CheckBoxPill = ({
	onClick,
	checked,
	title,
	subtitle,
	disabled,
}: {
	onClick: () => void;
	checked: boolean;
	title: string;
	subtitle?: string;
	disabled?: boolean;
}): JSX.Element => {
	return (
		<Pill
			disabled={disabled}
			onClick={onClick}
			center={
				<div>
					<p>
						<strong>{title}</strong>
					</p>
					<p>{subtitle}</p>
				</div>
			}
			rightSide={
				<input
					disabled={disabled}
					type={'checkbox'}
					checked={checked}
					onChange={onClick}
				/>
			}
		/>
	);
};
