import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headline, HeadlineProps } from '../../components/Headline/Headline';
import { QuestListItem } from '../../components/QuestListItem/QuestListItem';
import { useNumberOfUnclaimedQuests } from '../../hooks/useNumberOfUnclaimedQuests';
import { QuestName, QuestRecord } from '../../interfaces/Quest';
import { RoutesEnum } from '../../router/router';
import { selectNotInactiveQuests } from '../../store/selectors/combination/selectNotInactiveQuests';
import { useAppSelector } from '../../store/storeHooks';

export const QuestsScreen = ({
	headlineProps,
	routeAwayAfterAllClaimed,
}: {
	headlineProps: HeadlineProps;
	routeAwayAfterAllClaimed?: { to: RoutesEnum };
}): JSX.Element => {
	const navigate = useNavigate();
	const quests = useAppSelector(selectNotInactiveQuests);
	const numberOfUnclaimedQuests = useNumberOfUnclaimedQuests();

	useEffect(() => {
		if (routeAwayAfterAllClaimed && numberOfUnclaimedQuests === 0) {
			navigate(routeAwayAfterAllClaimed.to);
		}
	}, [numberOfUnclaimedQuests, navigate, routeAwayAfterAllClaimed]);

	return (
		<div className="container">
			<Headline
				text={headlineProps.text}
				routerButtonProps={headlineProps.routerButtonProps}
				style={headlineProps.style}
				className={headlineProps.className}
			/>
			{quests.length > 0 ? (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
					{quests.map((questEntry) => {
						const key = questEntry[0];
						const status = questEntry[1];

						const quest = { ...QuestRecord[key as QuestName], status };

						return <QuestListItem quest={quest} key={key} />;
					})}
				</div>
			) : (
				<h3>No active quests</h3>
			)}
		</div>
	);
};
