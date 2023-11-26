import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ResultsList } from '@/components/ResultsList';
import { responseMock } from '@/__tests__/mocks/responseMock';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Results list', () => {
  it('should render list of 3 items', () => {
    render(<ResultsList list={responseMock.products} />);

    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const item = getAllByRole('listitem');

    expect(item.length).toBe(3);
  });

  it('should render empty message', () => {
    render(<ResultsList list={[]} />);

    expect(screen.getByTestId('empty')).toHaveTextContent('No results');
  });
});
