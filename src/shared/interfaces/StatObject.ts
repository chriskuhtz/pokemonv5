export const stats = ['hp', 'attack', 'defence', 'spatk', 'spdef', 'speed'];
export type Stat = (typeof stats)[number];

export type StatObject = Record<Stat, number>;
