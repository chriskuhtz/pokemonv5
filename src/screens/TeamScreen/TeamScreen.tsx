import { useMemo } from 'react';
import { Headline } from '../../components/Headline/Headline';
import { TeamGrid } from '../../components/TeamGrid/TeamGrid';
import { RoutesEnum } from '../../router/router';
import { selectSaveFile } from '../../store/selectors/saveFile/selectSaveFile';
import { useAppSelector } from '../../store/storeHooks';

export const TeamScreen = (): JSX.Element => {
	const data = useAppSelector(selectSaveFile);

	const teamMembers = useMemo(() => {
		return data?.pokemon.filter((p) => p.onTeam);
	}, [data?.pokemon]);

	return (
		<div className="container">
			<Headline
				text={'Team'}
				routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
			/>
			{teamMembers && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<TeamGrid pokemon={teamMembers} />
				</div>
			)}
		</div>
	);
};
