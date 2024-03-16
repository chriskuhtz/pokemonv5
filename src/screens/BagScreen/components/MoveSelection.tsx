import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { ItemData } from '../../../interfaces/ItemData';
import { Pill } from '../../../ui_components/Pill/Pill';

export const MoveSelection = ({
	selectedPokemon,
	applyItemToPokemon,
	item,
}: {
	selectedPokemon: BattlePokemon;
	applyItemToPokemon: (
		pokemon: BattlePokemon,
		item: ItemData,
		moveName?: string
	) => Promise<void>;
	item: ItemData;
}): JSX.Element => {
	return (
		<div>
			{selectedPokemon.moveNames.map((m) => (
				<Pill
					key={m}
					center={m}
					onClick={() => applyItemToPokemon(selectedPokemon, item, m)}
					disabled={
						selectedPokemon.ppBoostedMoves.find((ppBM) => ppBM.name === m)
							?.boost === 3
					}
					rightSide={`${
						selectedPokemon.ppBoostedMoves.find((ppBM) => ppBM.name === m)
							?.boost ?? 0
					}/3`}
				/>
			))}
		</div>
	);
};
