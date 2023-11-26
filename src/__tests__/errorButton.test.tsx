import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorButton } from '@/components/ErrorButton';

describe('Error button', () => {
  it('should throw error on click', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ErrorButton />);

    expect(() =>
      fireEvent.click(screen.getByRole('button', { name: 'Throw Error' }))
    ).toThrowError('Test error');
    expect(consoleSpy).toBeCalled();
  });
});
