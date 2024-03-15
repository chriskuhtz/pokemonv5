import { useEffect, useMemo, useState } from 'react';
import { BattlePokemon } from '../../interfaces/BattlePokemon';

import { getPPByIndex } from '../../functions/getPPByIndex';
import { isMoveDisabled } from '../../functions/isMoveDisabled';
import { BattleAction } from '../../interfaces/BattleAction';
import { Inventory } from '../../interfaces/Inventory';
import {
	HealingItemType,
	PPItemType,
	PokeballType,
} from '../../interfaces/Item';
import { MoveDto } from '../../interfaces/Move';
import { SelectableAction } from '../../interfaces/SelectableAction';
import { ChooseAction } from './components/ChooseAction';
import { ChooseBall } from './components/ChooseBall';
import { ChooseItem } from './components/ChooseItem';
import { ChooseMove } from './components/ChooseMove';
import { ChooseTarget } from './components/ChooseTarget';

export const ChooseActionAndTarget = ({
	actor,
	availableActions,
	selectAction,
	pokemonOnField,
	inventory,
}: {
	actor: BattlePokemon;
	availableActions: SelectableAction[];
	selectAction: (updatedActor: BattlePokemon) => void;
	pokemonOnField: BattlePokemon[];
	inventory: Inventory;
}): JSX.Element => {
	const [actionName, setActionName] = useState<
		BattleAction['type'] | undefined
	>();
	const [move, setMove] = useState<MoveDto | undefined>();
	const [ball, setBall] = useState<PokeballType | undefined>();
	const [item, setItem] = useState<HealingItemType | PPItemType | undefined>();
	const [pokemonIdToPPRestore, setPokemonIdToPPRestore] = useState<
		string | undefined
	>();
	const [moveToPPRestore, setMoveToPPRestore] = useState<string | undefined>();

	const ppRestorationTarget = useMemo(
		() => pokemonOnField.find((p) => p.id === pokemonIdToPPRestore),
		[pokemonOnField, pokemonIdToPPRestore]
	);
	//select ppRestoration Action
	useEffect(() => {
		if (item && moveToPPRestore && pokemonIdToPPRestore) {
			console.log('yayaya');
			selectAction({
				...actor,
				nextAction: {
					type: 'HEALING_ITEM',
					item,
					ppRestoreMove: moveToPPRestore,
					target: pokemonIdToPPRestore,
				},
			});
		}
	}, [moveToPPRestore, item, actor, pokemonIdToPPRestore]);

	//no target needed for runAway
	useEffect(() => {
		if (actionName === 'RUNAWAY_ATTEMPT') {
			selectAction({
				...actor,
				nextAction: { type: 'RUNAWAY_ATTEMPT' },
			});
			setActionName(undefined);
		}
	}, [actionName, actor, selectAction]);

	//auto select target for prepared move
	useEffect(() => {
		const move = actor.moves.find(
			(m) => m.name === actor.preparedMove?.moveName
		);
		if (move) {
			selectAction({
				...actor,
				nextAction: {
					type: 'ATTACK',
					move,
					target: actor.preparedMove?.targetId,
				},
			});
		}
	}, []);

	//auto select target for locked in move
	useEffect(() => {
		const move = actor.moves.find(
			(m) => m.name === actor.lockedInMove?.moveName
		);
		const potentialTargets = pokemonOnField.filter((p) => p.id !== actor.id);
		const optimalTarget =
			potentialTargets[Math.floor(Math.random() * potentialTargets.length)].id;

		if (move) {
			selectAction({
				...actor,
				nextAction: {
					type: 'ATTACK',
					move,
					target: optimalTarget,
				},
			});
		}
	}, []);

	const reset = () => {
		setActionName(undefined);
		setMove(undefined);
		setBall(undefined);
		setItem(undefined);
		setMoveToPPRestore(undefined);
	};
	if (!actionName) {
		return (
			<ChooseAction
				open={!actionName}
				name={actor.name}
				setActionName={setActionName}
				availableActions={availableActions}
			/>
		);
	}

	if (actionName === 'ATTACK' && !move) {
		return (
			<ChooseMove
				open={actionName === 'ATTACK'}
				title={`which move should ${actor.name} use:`}
				setMove={setMove}
				usedPP={actor.usedPowerPoints}
				resetActor={reset}
				availableMoves={actor.moves.map((m) => ({
					displayName: m.name,
					actionType: 'ATTACK',
					disabled: isMoveDisabled(actor, pokemonOnField, m),
					move: m,
					availableTargets: [],
				}))}
			/>
		);
	}
	if (actionName === 'CATCH_ATTEMPT' && !ball) {
		return (
			<ChooseBall
				open={actionName === 'CATCH_ATTEMPT'}
				setBall={setBall}
				inventory={inventory}
				resetActor={reset}
			/>
		);
	}
	if (actionName === 'HEALING_ITEM' && !item) {
		return (
			<ChooseItem
				open={actionName === 'HEALING_ITEM'}
				setItem={setItem}
				inventory={inventory}
				resetActor={reset}
				availableTargets={
					availableActions.find((a) => a.actionType === actionName)
						?.availableTargets ?? []
				}
			/>
		);
	}
	if (!pokemonIdToPPRestore && item && ['ether', 'max-ether'].includes(item)) {
		return (
			<ChooseTarget
				actionName={actionName}
				item={item}
				selectAction={(x) => {
					setPokemonIdToPPRestore(x.id);
				}}
				availableTargets={
					availableActions.find((a) => a.actionType === actionName)
						?.availableTargets ?? []
				}
				actor={actor}
			/>
		);
	}
	if (!moveToPPRestore && item && ['ether', 'max-ether'].includes(item)) {
		if (!ppRestorationTarget) {
			console.error('who should we pp Restore?');
			return <></>;
		}
		return (
			<ChooseMove
				open={true}
				title={'restore which move´s pp'}
				setMove={(x) => setMoveToPPRestore(x?.name)}
				usedPP={ppRestorationTarget.usedPowerPoints}
				resetActor={reset}
				availableMoves={ppRestorationTarget.moves.map((m, i) => ({
					displayName: m.name,
					actionType: 'ATTACK',
					disabled: getPPByIndex(ppRestorationTarget.usedPowerPoints, i) === 0,
					move: m,
					availableTargets: [],
				}))}
			/>
		);
	}

	return (
		<ChooseTarget
			actionName={actionName}
			move={move}
			ball={ball}
			item={item}
			selectAction={(x) => {
				selectAction(x);
				setActionName(undefined);
				setMove(undefined);
				setBall(undefined);
				setItem(undefined);
				setMoveToPPRestore(undefined);
			}}
			availableTargets={
				availableActions.find((a) => a.actionType === actionName)
					?.availableTargets ?? []
			}
			actor={actor}
		/>
	);
};
