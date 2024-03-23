import { useCanPokemonEvolve } from '../../hooks/useCanPokemonEvolve';
import { PokemonData } from '../../interfaces/PokemonData';
import { Pill } from '../../ui_components/Pill/Pill';

export const EvolutionPill = ({
	data,
	level,
}: {
	data: PokemonData;
	level: number;
}): JSX.Element => {
	const canEvolve = useCanPokemonEvolve(data, level);

	if (canEvolve) {
		return (
			<Pill
				style={{ backgroundColor: 'green', padding: '2rem' }}
				center={<strong>Evolve {data.name}</strong>}
			/>
		);
	}
	return <></>;
};
