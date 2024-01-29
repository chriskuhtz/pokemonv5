export const MapObject = ({
	id,
	className,
	style,
}: {
	id: string;
	className?: string;
	style?: React.CSSProperties;
}) => {
	return (
		<img
			className={className}
			style={style}
			src={`assets/mapObjects//${id}.png`}
		/>
	);
};
