import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import Custom404 from '@/pages/404';

vi.mock('next/router', () => ({
  ...vi.importActual('next/router'),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('404 page', () => {
  it('should render not found page', async () => {
    const { getByText } = render(<Custom404 />);

    expect(getByText('Go to main')).toHaveAttribute('href', '/');
  });
});
