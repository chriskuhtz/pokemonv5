import { useMemo } from 'react';
import { DexSummary } from '../../components/DexSummary/DexSummary';
import { Headline } from '../../components/Headline/Headline';
import { PokedexListItem } from '../../components/PokedexListItem/PokedexListItem';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { RoutesEnum } from '../../router/router';

export const PokedexScreen = (): JSX.Element => {
	const data = useGetCurrentSaveFile();

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
			{data?.pokedex && <DexSummary dex={data.pokedex} />}
			{sortedDex && (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
					{sortedDex.map((d) => (
						<PokedexListItem key={d.dexId} dexEntry={d} />
					))}
				</div>
			)}
		</div>
	);
};
