import { AbilityPill } from '../../components/AbilityPill/AbilityPill';

export const TestArea = (): JSX.Element => {
	return (
		<div>
			<AbilityPill abilityName="static" />
			<AbilityPill abilityName="stench" />
			<AbilityPill abilityName="compound-eyes" />
		</div>
	);
};
