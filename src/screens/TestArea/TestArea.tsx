import { Tag } from '../../ui_components/Tag/Tag';

export const TestArea = (): JSX.Element => {
	return (
		<div
			style={{
				padding: '5rem 2rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Tag tag={<strong>Butt</strong>}>
				<strong>Hello</strong>
			</Tag>
		</div>
	);
};
