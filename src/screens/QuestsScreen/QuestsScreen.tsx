import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { Headline, HeadlineProps } from '../../components/Headline/Headline';
import { QuestListItem } from '../../components/QuestListItem/QuestListItem';
import { getUserName } from '../../functions/getUserName';
import { useHasUnclaimedQuests } from '../../hooks/useHasUnclaimedQuests';
import { QuestRecord, QuestsEnum } from '../../interfaces/Quest';
import { RoutesEnum } from '../../router/router';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const QuestsScreen = ({
	headlineProps,
	routeAwayAfterAllClaimed,
}: {
	headlineProps: HeadlineProps;
	routeAwayAfterAllClaimed?: { to: RoutesEnum };
}): JSX.Element => {
	const username = getUserName();
	const navigate = useNavigate();
	const { data, isError, isFetching } = useGetSaveFileQuery(
		username ?? skipToken
	);
	const hasUnclaimedQuests = useHasUnclaimedQuests();

	useEffect(() => {
		if (routeAwayAfterAllClaimed && !hasUnclaimedQuests) {
			navigate(routeAwayAfterAllClaimed.to);
		}
	}, [hasUnclaimedQuests, navigate, routeAwayAfterAllClaimed]);

	return (
		<div className="container">
			<Headline
				text={headlineProps.text}
				routerButtonProps={headlineProps.routerButtonProps}
				style={headlineProps.style}
				className={headlineProps.className}
			/>
			{isError && <ErrorScreen />}
			{isFetching && <FetchingScreen />}
			{data && (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
					{Object.entries(data.quests)
						.filter((q) => q[1] !== 'inactive')
						.map((questEntry) => {
							const key = questEntry[0];
							const status = questEntry[1];
							if (key in QuestsEnum) {
								const quest = { ...QuestRecord[key as QuestsEnum], status };
								return <QuestListItem quest={quest} key={key} />;
							}
						})}
				</div>
			)}
		</div>
	);
};
