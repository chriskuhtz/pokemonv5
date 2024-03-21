import { UniqueOccupantRecord } from '../../constants/UniqueOccupantRecord';
import { isOccupantWithSprite } from '../../functions/typeguards/occupantTypeGuards';
import { CharacterSprite } from '../CharacterSprite/CharacterSprite';

export const OccupantsList = ({}: {}): JSX.Element => {
	return (
		<div>
			{Object.values(UniqueOccupantRecord).map((occupant) => (
				<div>
					{isOccupantWithSprite(occupant) && (
						<CharacterSprite orientation={'Down'} index={occupant.sprite} />
					)}
					<strong>{`ID: ${occupant.id}`}</strong>
					<p>Type: {occupant.type}</p>
				</div>
			))}
		</div>
	);
};
