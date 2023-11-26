import { it, describe, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Fallback } from '@/components/Fallback';
import userEvent from '@testing-library/user-event';

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      ...window.location,
      reload: vi.fn(),
    },
    writable: true,
  });
});

describe('Fallback', () => {
  it('should reload window on click', async () => {
    render(<Fallback />);
    const user = userEvent.setup();

    const reloadButton = screen.getByRole('button', { name: /reload/i });
    await user.click(reloadButton);

    expect(window.location.reload).toBeCalled();
    expect(window.location.reload).toBeCalledTimes(1);
  });
});
