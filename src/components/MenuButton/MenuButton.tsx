import { TiThMenu } from 'react-icons/ti';
import { useNumberOfUnclaimedQuests } from '../../hooks/useNumberOfUnclaimedQuests';
import { RoutesEnum } from '../../router/router';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { selectNextNotification } from '../../store/selectors/notification/selectNextNotification';
import { useAppSelector } from '../../store/storeHooks';
import { Tag } from '../../ui_components/Tag/Tag';
import { RouterButton } from '../RouterButton/RouterButton';

export const MenuButton = () => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const noti = useAppSelector(selectNextNotification);
	const numberOfUnclaimed = useNumberOfUnclaimedQuests();

	if (currentDialogue.length === 0 && !noti) {
		console.log(numberOfUnclaimed);
		return (
			<div className="leftCorner">
				<Tag tag={numberOfUnclaimed > 0 ? numberOfUnclaimed : undefined}>
					<RouterButton
						to={RoutesEnum.menu}
						text={<TiThMenu style={{ height: '30px', width: '30px' }} />}
					/>
				</Tag>
			</div>
		);
	}
	return <></>;
};
