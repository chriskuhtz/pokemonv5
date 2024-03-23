import { useMemo, useState } from 'react';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { SaveGameFunction } from '../../hooks/useSaveGame';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../interfaces/PokemonData';
import { CheckBoxPill } from '../../ui_components/CheckBoxPill/CheckBoxPill';
import { Modal } from '../../ui_components/Modal/Modal';
import { Pill } from '../../ui_components/Pill/Pill';

export const MoveConfigurationSection = ({
	pokemon,
	data,
	save,
}: {
	pokemon: OwnedPokemon;
	data: PokemonData;
	save: SaveGameFunction;
}): JSX.Element => {
	const { xp } = pokemon;
	const { level } = calculateLevelData(xp);
	const [open, setOpen] = useState<boolean>(false);
	const [selectedMoves, setSelectedMoves] = useState<string[]>(
		pokemon.moveNames
	);

	const availableMoves = useMemo(() => {
		return [
			...new Set([
				...pokemon.moveNames,
				...data.moves
					.filter(
						(m) =>
							m.version_group_details[0].move_learn_method.name ===
								'level-up' &&
							level >= m.version_group_details[0].level_learned_at
					)
					.map((m) => m.move.name),
			]),
		];
	}, [pokemon, data]);

	return (
		<div>
			<Modal
				open={open}
				onCancel={() => setOpen(false)}
				modalTitle="Select up to 4 active Moves"
				modalContent={
					<div>
						{availableMoves.map((m) => {
							const alreadySelected = selectedMoves.some((s) => s === m);

							return (
								<CheckBoxPill
									title={m}
									onClick={() => {
										if (alreadySelected) {
											setSelectedMoves(selectedMoves.filter((s) => s !== m));
										} else setSelectedMoves([...selectedMoves, m]);
									}}
									checked={alreadySelected}
								/>
							);
						})}
						<Pill
							disabled={selectedMoves.length > 4 || selectedMoves.length === 0}
							onClick={() =>
								save({
									pokemonUpdates: [{ ...pokemon, moveNames: selectedMoves }],
								})
							}
							style={{ backgroundColor: 'green' }}
							center={'Save'}
						/>
					</div>
				}
			/>
			<Pill
				onClick={() => setOpen(true)}
				center={<strong>Configure Moves</strong>}
			/>
		</div>
	);
};
