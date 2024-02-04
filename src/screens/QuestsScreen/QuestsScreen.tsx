import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headline, HeadlineProps } from '../../components/Headline/Headline';
import { QuestListItem } from '../../components/QuestListItem/QuestListItem';
import { useHasUnclaimedQuests } from '../../hooks/useHasUnclaimedQuests';
import { QuestName, QuestRecord, questNames } from '../../interfaces/Quest';
import { RoutesEnum } from '../../router/router';
import { selectSaveFile } from '../../store/selectors/saveFile/selectSaveFile';
import { useAppSelector } from '../../store/storeHooks';

export const QuestsScreen = ({
	headlineProps,
	routeAwayAfterAllClaimed,
}: {
	headlineProps: HeadlineProps;
	routeAwayAfterAllClaimed?: { to: RoutesEnum };
}): JSX.Element => {
	const navigate = useNavigate();
	const data = useAppSelector(selectSaveFile);
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
			{data && (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
					{Object.entries(data.quests)
						.filter((q) => q[1] !== 'inactive')
						.map((questEntry) => {
							const key = questEntry[0];
							const status = questEntry[1];
							if (key in questNames) {
								const quest = { ...QuestRecord[key as QuestName], status };
								return <QuestListItem quest={quest} key={key} />;
							}
						})}
				</div>
			)}
		</div>
	);
};
