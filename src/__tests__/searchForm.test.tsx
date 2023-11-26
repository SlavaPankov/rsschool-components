import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchForm } from '@/components/SearchForm';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';

vi.mock('next/router', () => vi.importActual('next-router-mock'));
const testInput = 'test';
describe('Search form', () => {
  it('should push search value to query params', async () => {
    render(<SearchForm />);
    const user = userEvent.setup();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: testInput },
    });

    await user.click(screen.getByRole('button', { name: 'search' }));

    expect(mockRouter).toMatchObject({
      asPath: `/?search=${testInput}`,
      pathname: '/',
      query: { search: testInput },
    });
  });

  it('should remove query params, when search input empty', async () => {
    await mockRouter.push({ pathname: '/', query: { search: testInput } });
    render(<SearchForm />);

    const user = userEvent.setup();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '' },
    });

    expect(mockRouter).toMatchObject({
      asPath: `/?search=${testInput}`,
      pathname: '/',
      query: { search: testInput },
    });

    await user.click(screen.getByRole('button', { name: 'search' }));

    expect(mockRouter).toMatchObject({
      asPath: `/`,
      pathname: '/',
      query: {},
    });
  });
});
