import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from '@/components/Heading';

describe('Heading', () => {
  it('should render text heading', () => {
    render(<Heading />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Search product'
    );
  });
});
