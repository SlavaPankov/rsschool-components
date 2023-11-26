/* eslint-disable react/jsx-props-no-spreading */
import { describe, expect, it, vi } from 'vitest';
import Home, { getServerSideProps } from '@/pages';
import { render, waitFor, within, screen } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Home page', () => {
  it('should render page with data from server', async () => {
    const context = {
      query: {},
    };

    const serverSideProps = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    render(<Home {...serverSideProps.props} />);

    await waitFor(() => screen.getByRole('list'));

    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');

    expect(items.length).toBe(3);
  });

  it('should render empty list', async () => {
    const context = {
      query: { search: 'fail' } as NextParsedUrlQuery,
    };

    const serverSideProps = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    render(<Home {...serverSideProps.props} />);

    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });

  it('should navigate to detail page on item click', async () => {
    mockRouter.setCurrentUrl('/');
    const context = {
      query: {},
    };

    const serverSideProps = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    render(
      <RouterContext.Provider value={mockRouter}>
        <Home {...serverSideProps.props} />
      </RouterContext.Provider>
    );
    const user = userEvent.setup();

    await waitFor(() => screen.getByRole('list'));

    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const links = getAllByRole('link');

    await user.click(links[1]);

    expect(mockRouter).toMatchObject({
      asPath: '/detail/1',
      pathname: '/detail/1',
    });
  });
});
