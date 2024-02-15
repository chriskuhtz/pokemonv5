import { BattleAction, BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Modal } from '../../../ui_components/Modal/Modal';
import { Pill } from '../../../ui_components/Pill/Pill';
import { TwoByXGrid } from '../../../ui_components/TwoByXGrid/TwoByXGrid';

export const ChooseTargetModal = ({
	open,
	setOpen,
	availableTargets,
	selectAction,
	actionName,
	actor,
}: {
	open: boolean;
	setOpen: (x: boolean) => void;
	actionName: BattleAction['type'];
	selectAction: (updatedActor: BattlePokemon) => void;
	availableTargets: BattlePokemon[];
	actor: BattlePokemon;
}) => {
	return (
		<Modal
			open={!!(actionName && open)}
			onCancel={() => {
				setOpen(false),
					selectAction({
						...actor,
						nextAction: undefined,
					});
			}}
			modalTitle={`who is the target`}
			modalContent={
				<TwoByXGrid>
					{availableTargets.map((c) => (
						<Pill
							key={c.id}
							onClick={() => {
								setOpen(false);
								selectAction({
									...actor,
									nextAction: {
										type: actionName,
										target: c.id,
									},
								});
							}}
							center={c.name}
						/>
					))}
				</TwoByXGrid>
			}
		/>
	);
};
