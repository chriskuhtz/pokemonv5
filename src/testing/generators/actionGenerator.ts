import { Action } from '../../interfaces/Action';

export const actionGenerator = (data?: Partial<Action>): Action => {
	return { target: 'NO_ONE', name: 'testAction', ...data };
};
