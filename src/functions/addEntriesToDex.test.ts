import { DexEntry } from '../interfaces/DexEntry';
import { addEntriesToDex } from './addEntriesToDex';

describe('addEntriesToDex', () => {
	it('should add new seen pokemon to empty dex', () => {
		const existing: DexEntry[] = [];
		const newEntries: DexEntry[] = [{ dexId: 5, status: 'seen' }];

		expect(addEntriesToDex(existing, newEntries)).toContain(newEntries[0]);
		expect(addEntriesToDex(existing, newEntries).length).toBe(1);
	});
	it('should add new seen pokemon to dex with entries', () => {
		const existing: DexEntry[] = [{ dexId: 4, status: 'seen' }];
		const newEntries: DexEntry[] = [{ dexId: 5, status: 'seen' }];

		expect(addEntriesToDex(existing, newEntries)).toContain(newEntries[0]);
		expect(
			addEntriesToDex(existing, newEntries).every((d) => d.status === 'seen')
		).toBe(true);
		expect(addEntriesToDex(existing, newEntries).length).toBe(2);
	});
	it('should upgrade existing entries to owned', () => {
		const existing: DexEntry[] = [{ dexId: 5, status: 'seen' }];
		const newEntries: DexEntry[] = [{ dexId: 5, status: 'owned' }];

		expect(addEntriesToDex(existing, newEntries)[0].status).toBe('owned');

		expect(addEntriesToDex(existing, newEntries).length).toBe(1);
	});
	it('should not downgrade existing entries to seen', () => {
		const existing: DexEntry[] = [{ dexId: 5, status: 'owned' }];
		const newEntries: DexEntry[] = [{ dexId: 5, status: 'seen' }];

		expect(addEntriesToDex(existing, newEntries)[0].status).toBe('owned');

		expect(addEntriesToDex(existing, newEntries).length).toBe(1);
	});
});
