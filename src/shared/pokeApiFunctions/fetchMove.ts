import { MoveDto } from '../interfaces/Move';

export const fetchMove = async (name: string): Promise<MoveDto | undefined> => {
	const parsedName = name.toLowerCase().replace(' ', '-');
	const url = `https://pokeapi.co/api/v2/move/${parsedName}`;

	const res = await fetch(url);

	if (res.status === 200) {
		return res.json();
	}
	return undefined;
};
