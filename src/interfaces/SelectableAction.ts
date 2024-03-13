import { ReactNode } from 'react';
import { BattleAction } from './BattleAction';
import { BattlePokemon } from './BattlePokemon';
import { MoveDto } from './Move';

export interface SelectableAction {
	actionType: BattleAction['type'];
	displayName: ReactNode;
	move?: MoveDto;
	disabled: boolean;
	availableTargets: BattlePokemon[];
}
