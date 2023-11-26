/* eslint-disable react/jsx-props-no-spreading, import/no-extraneous-dependencies */
import { createRequest, createResponse } from 'node-mocks-http';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DetailPage, { getServerSideProps } from '@/pages/detail/[id]';
import { GetServerSidePropsContext } from 'next';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

const context: GetServerSidePropsContext = {
  query: {},
  params: {
    id: '1',
  },
  req: createRequest(),
  res: createResponse(),
  resolvedUrl: '',
};

describe('Detail page', () => {
  it('should render detail page', async () => {
    const serverSideProps = await getServerSideProps(context);

    render(<DetailPage {...serverSideProps.props} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test');
  });

  it('should navigate to main page after click on close button', async () => {
    mockRouter.setCurrentUrl('/details/1');
    const serverSideProps = await getServerSideProps(context);

    render(<DetailPage {...serverSideProps.props} />);
    const user = userEvent.setup();

    const crossButton = screen.getByRole('button', { name: 'cross' });

    await user.click(crossButton);

    expect(mockRouter).toMatchObject({
      pathname: '/',
      asPath: '/',
      query: {},
    });
  });

  it('should navigate to main page after click on out of boundary', async () => {
    mockRouter.setCurrentUrl('/details/1');
    const serverSideProps = await getServerSideProps(context);

    render(<DetailPage {...serverSideProps.props} />);
    const user = userEvent.setup();

    const heading = screen.getByRole('heading', { level: 1 });

    await user.click(heading);

    expect(mockRouter).toMatchObject({
      pathname: '/',
      asPath: '/',
      query: {},
    });
  });

  it('should throw error if no data', async () => {
    const currentContext = {
      query: { search: 'fail' } as NextParsedUrlQuery,
    };

    const serverSideProps = await getServerSideProps(
      currentContext as GetServerSidePropsContext
    );

    render(<DetailPage {...serverSideProps.props} />);

    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });
});
