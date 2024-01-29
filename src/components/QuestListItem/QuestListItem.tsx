import { useIsConditionFulfilled } from '../../hooks/useIsConditionFulfilled';
import { useSaveGame } from '../../hooks/useSaveGame';
import { Quest } from '../../interfaces/Quest';
import { IconWithTag } from '../../shared/components/IconWithTag/IconWithTag';
import { Pill } from '../../ui_components/Pill/Pill';

export const QuestListItem = ({ quest }: { quest: Quest }) => {
	const isConditionFulfilled = useIsConditionFulfilled();
	const save = useSaveGame();

	return (
		<Pill
			leftSide={
				quest.status === 'active' && isConditionFulfilled(quest.condition) ? (
					<Pill
						style={{ backgroundColor: 'green' }}
						onClick={() => save({ questUpdates: { [quest.id]: 'completed' } })}
						center={'claim'}
					/>
				) : (
					quest.status
				)
			}
			center={
				<div>
					<h3>{quest.title}</h3>
					<p>{quest.description}</p>
					<p>Reward Money: {quest.rewardMoney}$</p>
				</div>
			}
			rightSide={
				quest.rewardItems && (
					<div style={{ display: 'flex' }}>
						{Object.entries(quest.rewardItems)
							.filter((entry) => entry[1] > 0)
							.map((entry) => (
								<IconWithTag
									key={entry[0]}
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${entry[0]}.png`}
									tag={entry[1]}
								/>
							))}
					</div>
				)
			}
		/>
	);
};
