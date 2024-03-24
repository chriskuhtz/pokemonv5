import { useEffect } from 'react';
import { TiThMenu } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { useNumberOfUnclaimedQuests } from '../../hooks/useNumberOfUnclaimedQuests';
import { RoutesEnum } from '../../router/router';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { selectNextNotification } from '../../store/selectors/notification/selectNextNotification';
import { useAppSelector } from '../../store/storeHooks';
import { Tag } from '../../ui_components/Tag/Tag';
import { RouterButton } from '../RouterButton/RouterButton';
import { TimeOfDayIcon } from '../TimeOfDayIcon/TimeOfDayIcon';

export const MenuButton = () => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const noti = useAppSelector(selectNextNotification);
	const numberOfUnclaimed = useNumberOfUnclaimedQuests();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentDialogue.length === 0 && !noti && numberOfUnclaimed > 0) {
			navigate(RoutesEnum.newFulfilledQuest);
		}
	}, [currentDialogue, noti, numberOfUnclaimed]);

	if (currentDialogue.length === 0 && !noti) {
		return (
			<>
				<div className="leftCorner">
					<Tag
						color="orange"
						tag={numberOfUnclaimed > 0 ? numberOfUnclaimed : undefined}
					>
						<RouterButton
							to={RoutesEnum.menu}
							text={<TiThMenu style={{ height: '30px', width: '30px' }} />}
						/>
					</Tag>
				</div>
				<div className="rightCorner">
					<TimeOfDayIcon style={{ height: '40px', width: '40px' }} />
				</div>
			</>
		);
	}
	return <></>;
};
