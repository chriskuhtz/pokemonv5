import { useEffect, useState } from 'react';
import { MoveDto } from '../../interfaces/Move';
import { fetchMove } from '../../pokeApiFunctions/fetchMove';
import {
	RequestState,
	RequestStateDisplay,
} from '../RequestStateDisplay/RequestStateDisplay';
import { MovePill } from './MovePill';

export const PokeApiMovePill = ({
	name,
	overWrites,
}: {
	name: string;
	overWrites?: Partial<MoveDto>;
}) => {
	const [move, setMove] = useState<MoveDto | undefined>();
	const [requestState, setRequestState] =
		useState<RequestState>('uninitialized');

	useEffect(() => {
		setRequestState('uninitialized');
		setMove(undefined);
	}, [name]);

	useEffect(() => {
		if (move === undefined && requestState === 'uninitialized') {
			setRequestState('loading');
			const getMove = async () => {
				const res = await fetchMove(name);
				if (res) {
					setMove({ ...res, ...overWrites });
					setRequestState('success');
				} else setRequestState('error');
			};
			getMove();
		}
	}, [move, name, overWrites, requestState]);

	if (requestState === 'success' && move) {
		return (
			<MovePill
				name={move.name}
				maxPP={move.pp}
				type={move.type.name}
				description={
					move.flavor_text_entries.find((f) => f.language.name === 'en')
						?.flavor_text
				}
			/>
		);
	}
	return <RequestStateDisplay requestState={requestState} />;
};
