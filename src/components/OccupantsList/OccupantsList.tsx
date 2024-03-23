import { CSSProperties, useState } from 'react';
import { UniqueOccupantRecord } from '../../constants/UniqueOccupantRecord';
import { isOccupantWithSprite } from '../../functions/typeguards/occupantTypeGuards';
import {
	OccupantType,
	occupantTypes,
} from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { MapId, mapIds } from '../../store/slices/MapSlice';
import { FilterButtons } from '../../ui_components/FilterButtons/FilterButtons';
import { CharacterSprite } from '../CharacterSprite/CharacterSprite';

export const OccupantsList = ({}: {}): JSX.Element => {
	const [mapFilter, setMapFilter] = useState<MapId | undefined>();
	const [typeFilter, setTypeFilter] = useState<OccupantType | undefined>();

	return (
		<div className="container">
			<FilterButtons
				title={'Filter By Map'}
				options={mapIds as unknown as string[]}
				selected={mapFilter}
				setSelected={(x) => setMapFilter(x as MapId | undefined)}
			/>
			<FilterButtons
				title={'Filter By Occupanttype'}
				options={occupantTypes as unknown as string[]}
				selected={typeFilter}
				setSelected={(x) => setTypeFilter(x as OccupantType | undefined)}
			/>
			<div
				style={{
					display: 'grid',
					gap: '.5rem',
					gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
				}}
			>
				{Object.values(UniqueOccupantRecord).map((occupant) => {
					if (mapFilter && occupant.position.mapId !== mapFilter) {
						return <></>;
					}
					if (typeFilter && occupant.type !== typeFilter) {
						return <></>;
					}
					return (
						<div
							style={{
								border: '1px solid',
								borderRadius: '.5rem',
								padding: '.5rem',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '.5rem',
							}}
						>
							{isOccupantWithSprite(occupant) &&
								(occupant.type === 'ITEM' ? (
									<div>
										{Object.entries(occupant.inventory).map(([key, value]) => {
											if (value < 1) {
												return <></>;
											}
											return (
												<img
													height={40}
													width={40}
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${key}.png`}
												/>
											);
										})}
									</div>
								) : (
									<CharacterSprite
										orientation={'Down'}
										index={occupant.sprite.slice(-3)}
										style={{ '--size': '40px' } as CSSProperties}
									/>
								))}
							<strong>{`ID: ${occupant.id}`}</strong>
							<p>Type: {occupant.type}</p>
							<p>Map: {occupant.position.mapId}</p>
							<p>
								Coordinates:{occupant.position.x}/{occupant.position.y}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
