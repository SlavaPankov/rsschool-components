import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Fallback } from '@/components/Fallback';

function TestComponent({ hasError }: { hasError: boolean }) {
  if (hasError) {
    throw new Error('oops');
  }

  return <div>lorem</div>;
}

describe('Error boundary', () => {
  it('should render fallback', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { getByRole } = render(
      <ErrorBoundary fallback={<Fallback />}>
        <TestComponent hasError />
      </ErrorBoundary>
    );

    expect(getByRole('heading', { level: 1 })).toHaveTextContent(
      'Oops! Something goes wrong...'
    );
    expect(consoleSpy).toBeCalled();
  });
});
