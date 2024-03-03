import { useGetMoveDataByNameQuery } from '../../../../api/pokeApi';
import { FetchingPill } from '../../../../ui_components/FetchingPill/FetchingPill';
import { MovePill } from './MovePill';

export const PokeApiMovePill = ({
	name,
}: {
	name: string;
	//overWrites?: Partial<MoveDto>;
}) => {
	const { data: move } = useGetMoveDataByNameQuery(name);

	if (move) {
		return (
			<MovePill
				name={move.name}
				maxPP={move.pp}
				type={move.type.name}
				description={
					move.flavor_text_entries.find((f) => f.language.name === 'en')
						?.flavor_text
				}
			/>
		);
	}
	return <FetchingPill />;
};
