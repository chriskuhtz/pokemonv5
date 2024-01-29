import { CharacterSprite } from '../../components/CharacterSprite/CharacterSprite';
import { useRotate } from '../../hooks/useRotate';

export const FetchingScreen = ({
	invisible,
}: {
	invisible?: boolean;
}): JSX.Element => {
	const currentOrientation = useRotate();

	if (invisible) {
		return <></>;
	}
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				height: '100dvh',
			}}
		>
			<h2>Something is loading</h2>
			<div style={{ display: 'flex' }}>
				<CharacterSprite
					orientation={currentOrientation}
					index={'136'}
					style={
						{
							'--size': '80px',
							marginRight: '-40px',
						} as React.CSSProperties
					}
				/>
				<CharacterSprite
					orientation={currentOrientation}
					index={'137'}
					style={
						{
							'--size': '80px',
							marginRight: '-40px',
						} as React.CSSProperties
					}
				/>
				<CharacterSprite
					orientation={currentOrientation}
					index={'138'}
					style={
						{
							'--size': '80px',
							marginRight: '-40px',
						} as React.CSSProperties
					}
				/>
			</div>
		</div>
	);
};
