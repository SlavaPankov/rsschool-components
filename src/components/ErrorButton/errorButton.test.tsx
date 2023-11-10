import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';
import { Fallback } from '../Fallback';

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      ...window.location,
      reload: vi.fn(),
    },
    writable: true,
  });
});

describe('Error button', () => {
  it('should render fallback', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    const user = userEvent.setup();

    const errorButton = screen.getByRole('button', { name: /throw error/i });
    await user.click(errorButton);

    expect(consoleSpy).toBeCalled();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Oops! Something goes wrong...'
    );
  });

  it('should called window reload', async () => {
    render(<Fallback />);
    const user = userEvent.setup();

    const reloadButton = screen.getByRole('button', { name: /reload/i });
    await user.click(reloadButton);

    expect(window.location.reload).toBeCalled();
    expect(window.location.reload).toBeCalledTimes(1);
  });
});
