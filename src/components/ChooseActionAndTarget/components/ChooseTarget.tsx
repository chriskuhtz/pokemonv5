import { IoIosCloseCircle } from 'react-icons/io';
import { BattleAction, BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Pill } from '../../../ui_components/Pill/Pill';
export const ChooseTarget = ({
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
	if (actionName && open) {
		return (
			<div
				className="bottomDialogue"
				style={{
					display: 'flex',
					justifyContent: 'space-evenly',
					backgroundColor: 'var(--main-bg-color)',
					alignItems: 'center',
					gap: '0.5rem',
				}}
			>
				<strong>{`who is the target:`}</strong>
				{availableTargets.map((c) => (
					<Pill
						style={{ flexGrow: 1 }}
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
				<IoIosCloseCircle
					style={{ height: '40px', width: '40px' }}
					onClick={() => {
						setOpen(false),
							selectAction({
								...actor,
								nextAction: undefined,
							});
					}}
				/>
			</div>
		);
	}
	return <></>;
};
