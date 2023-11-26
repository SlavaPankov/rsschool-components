import { describe, expect, it, vi } from 'vitest';
import mockRouter from 'next-router-mock';
import { act, render, waitFor } from '@testing-library/react';
import { Loader } from '@/components/Loader';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Loader', () => {
  it('should shows and hides based on route changes', async () => {
    const { queryByText } = render(<Loader />);

    expect(queryByText('Loading...')).toBeNull();

    act(() => {
      mockRouter.events.emit('routeChangeStart');
    });

    await waitFor(() => {
      expect(queryByText('Loading...')).toBeInTheDocument();
    });

    act(() => {
      mockRouter.events.emit('routeChangeComplete');
    });
    await waitFor(() => {
      expect(queryByText('Loading...')).toBeNull();
    });
  });
});
