import { expect, describe, it } from 'vitest';
import { searchContextDefaultValue } from './searchContext';

describe('search context', () => {
  it('should works', async () => {
    expect(searchContextDefaultValue.page).toBe(1);
    expect(searchContextDefaultValue.search).toBe('');
    expect(searchContextDefaultValue.limit).toBe(10);

    searchContextDefaultValue.setSearch('newSearch');
    searchContextDefaultValue.setPage(2);
    searchContextDefaultValue.setLimit(20);

    expect(searchContextDefaultValue.search).toBe('newSearch');
    expect(searchContextDefaultValue.page).toBe(2);
    expect(searchContextDefaultValue.limit).toBe(20);
  });
});
