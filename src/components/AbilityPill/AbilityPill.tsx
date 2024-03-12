import { useMemo } from 'react';
import { useGetAbilityByNameQuery } from '../../api/pokeApi';
import { Ability, abilityCheckList } from '../../constants/abilityCheckList';
import { Pill } from '../../ui_components/Pill/Pill';

export const AbilityPill = ({ abilityName }: { abilityName: Ability }) => {
	const { data } = useGetAbilityByNameQuery(abilityName);

	const handled = useMemo(
		() => abilityCheckList.find((a) => a.name === abilityName)?.handled,
		[abilityName]
	);
	if (data) {
		return (
			<Pill
				leftSide={<strong>Ability: {data.name}</strong>}
				center={
					data.flavor_text_entries.find((e) => e.language.name === 'en')
						?.flavor_text
				}
				rightSide={handled ? 'Implemented' : 'Not Implemented'}
			/>
		);
	}
};
