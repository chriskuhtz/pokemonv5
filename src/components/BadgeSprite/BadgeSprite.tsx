import { GymBadge } from '../../interfaces/SaveFile';

export const BadgeSprite = ({
	badge,
	size,
}: {
	badge: GymBadge;
	size?: number;
}): JSX.Element => {
	return <img height={`${size ?? 40}px`} src={`/badges/${badge}.png`} />;
};
