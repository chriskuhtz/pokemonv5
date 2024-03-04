import { GymBadge } from '../../interfaces/SaveFile';

export const BadgeSprite = ({ badge }: { badge: GymBadge }): JSX.Element => {
	return <img height={'40px'} src={`/badges/${badge}.png`} />;
};
