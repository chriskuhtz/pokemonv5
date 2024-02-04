import { useMemo } from 'react';
import { Headline } from '../../components/Headline/Headline';
import { useHydratedInventory } from '../../hooks/useHydratedInventory';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { RoutesEnum } from '../../router/router';
import { FetchingPill } from '../../ui_components/FetchingPill/FetchingPill';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';

export const BagScreen = (): JSX.Element => {
	const saveFile = useGetCurrentSaveFile();

	const inventory = useMemo(() => {
		if (saveFile) {
			return Object.fromEntries(
				Object.entries(saveFile.inventory).filter((entry) => entry[1] > 0)
			);
		}

		return {};
	}, [saveFile]);

	const { hydratedInventory, status } = useHydratedInventory(inventory);

	if (!saveFile) {
		return <ErrorScreen text="no save file" />;
	}
	return (
		<div className="container">
			<Headline
				text={'Inventory'}
				routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
			/>
			{(status === 'fetching' || status === 'uninitialized') && (
				<>
					<FetchingPill />
					<FetchingPill />
					<FetchingPill />
				</>
			)}
			{status === 'error' ||
			(status === 'success' && !hydratedInventory) ||
			(status === 'success' && hydratedInventory?.length === 0) ? (
				<Pill center={'You dont have any items in your inventory'} />
			) : (
				hydratedInventory?.map((item) => (
					<Pill
						withHoverEffect
						leftSide={
							<img
								height={40}
								width={40}
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
							/>
						}
						key={item.name}
						center={item.name}
					/>
				))
			)}
		</div>
	);
};
