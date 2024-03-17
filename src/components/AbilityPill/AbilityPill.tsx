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
				leftSide={<strong>Ability:</strong>}
				center={
					<div>
						<p>
							<strong> {data.name}</strong>
						</p>
						<p>
							{
								data.flavor_text_entries.find((e) => e.language.name === 'en')
									?.flavor_text
							}
						</p>
					</div>
				}
				rightSide={handled ? 'Implemented' : 'Not Implemented'}
			/>
		);
	}
};
