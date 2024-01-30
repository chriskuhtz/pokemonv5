import { useMemo } from 'react';
import { Headline } from '../../components/Headline/Headline';
import { PokedexListItem } from '../../components/PokedexListItem/PokedexListItem';
import { RoutesEnum } from '../../router/router';
import { selectSaveFile } from '../../store/slices/saveFileSlice';
import { useAppSelector } from '../../store/storeHooks';

export const PokedexScreen = (): JSX.Element => {
	const data = useAppSelector(selectSaveFile);

	const sortedDex = useMemo(() => {
		if (!data) {
			return;
		}
		return [...data.pokedex].sort((a, b) => a.dexId - b.dexId);
	}, [data]);

	return (
		<div className="container">
			<Headline
				text={'Pokedex'}
				routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
			/>
			{sortedDex && (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
					{sortedDex.map((d) => (
						<PokedexListItem dexEntry={d} />
					))}
				</div>
			)}
		</div>
	);
};
