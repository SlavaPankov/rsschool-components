import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/Card';
import { productMock } from '@/__tests__/mocks/productMock';

describe('Card test', () => {
  it('should render correctly data', async () => {
    render(<Card product={productMock} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      productMock.title
    );
    expect(screen.getByTestId('paragraph')).toHaveTextContent(
      productMock.description
    );
    expect(screen.getByTestId('price')).toHaveTextContent(
      `${productMock.price} $`
    );
  });
});
