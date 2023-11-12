import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../../App';

describe('Not found page', () => {
  it('should redirect to 404', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/detail'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Page not found'
    );
  });
});
