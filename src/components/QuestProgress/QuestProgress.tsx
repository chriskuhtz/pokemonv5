import { UniqueOccupantRecord } from '../../constants/UniqueOccupantRecord';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { isOccupantWithSprite } from '../../functions/typeguards/occupantTypeGuards';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { Quest } from '../../interfaces/Quest';
import { CharacterSprite } from '../CharacterSprite/CharacterSprite';
import { IconWithTag } from '../IconWithTag/IconWithTag';

export const QuestProgress = ({ quest }: { quest: Quest }) => {
	const saveFile = useGetCurrentSaveFile();

	if (!saveFile) {
		return <></>;
	}

	if (quest.condition.type === 'NUMBER_OF_TEAMMEMBERS') {
		const numberOfMembers = saveFile?.pokemon.filter((p) => p.onTeam).length;
		return (
			<div>
				{numberOfMembers}/{quest.condition.numberOfMembers}
			</div>
		);
	}
	if (quest.condition.type === 'HANDLED_OCCUPANTS') {
		return (
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{quest.condition.ids.map((id) => {
					const occupant = UniqueOccupantRecord[id];

					if (isOccupantWithSprite(occupant)) {
						return (
							<CharacterSprite
								key={id}
								orientation={'Down'}
								style={
									{
										'--size': '40px',
										filter: saveFile.handledOccupants[id]
											? undefined
											: 'grayscale(100%)',
									} as React.CSSProperties
								}
								index={occupant.sprite}
							/>
						);
					}
				})}
			</div>
		);
	}
	if (quest.condition.type === 'OWNED_POKEMON') {
		return (
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{quest.condition.ids.map((id) => (
					<IconWithTag
						style={
							saveFile.pokedex.some(
								(p) => p.dexId === id && p.status === 'owned'
							)
								? undefined
								: { filter: 'grayscale(100%)' }
						}
						key={id}
						src={getPokemonSpriteUrl(id)}
					/>
				))}
			</div>
		);
	}
	return <></>;
};
