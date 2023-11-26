import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from '@/components/Pagination';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Pagination', () => {
  it('should update query params on click next button', async () => {
    render(<Pagination total={100} />);
    const user = userEvent.setup();

    const nextButton = screen.getByRole('button', { name: 'Next' });

    await act(async () => {
      await user.click(nextButton);
    });

    await act(async () => {
      await user.click(nextButton);
    });

    await act(async () => {
      await user.click(nextButton);
    });

    expect(mockRouter).toMatchObject({
      asPath: '/?page=4',
      pathname: '/',
      query: { page: String(4) },
    });
  });

  it('should update query params on click prev button', async () => {
    render(<Pagination total={100} />);
    await act(async () => {
      await mockRouter.push({ query: { page: String(6) } });
    });
    const user = userEvent.setup();

    const prevButton = screen.getByRole('button', { name: 'Prev' });

    await act(async () => {
      await user.click(prevButton);
    });

    await act(async () => {
      await user.click(prevButton);
    });

    await act(async () => {
      await user.click(prevButton);
    });

    expect(mockRouter).toMatchObject({
      asPath: '/?page=3',
      pathname: '/',
      query: { page: String(3) },
    });
  });

  it('should delete page query if page number equal 1', async () => {
    render(<Pagination total={100} />);
    await act(async () => {
      await mockRouter.push({ query: { page: String(2) } });
    });

    const user = userEvent.setup();

    const prevButton = screen.getByRole('button', { name: 'Prev' });

    await act(async () => {
      await user.click(prevButton);
    });

    expect(mockRouter).toMatchObject({
      asPath: '/',
      pathname: '/',
      query: {},
    });
  });

  it('should change query param limit and delete page query param', async () => {
    render(<Pagination total={100} />);
    await act(async () => {
      await mockRouter.push({ query: { page: String(2) } });
    });
    const newValue = 20;
    const select = screen.getByTestId('select');

    act(() => {
      fireEvent.change(select, { target: { value: newValue } });
    });

    const options = screen.getAllByTestId(
      'select-option'
    ) as HTMLOptionElement[];

    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
    expect(mockRouter).toMatchObject({
      asPath: `/?limit=${newValue}`,
      pathname: '/',
      query: { limit: String(newValue) },
    });
  });

  it('should delete query param limit if value is default', async () => {
    render(<Pagination total={100} />);
    await act(async () => {
      await mockRouter.push({ query: { limit: String(20) } });
    });
    const newValue = 10;
    const select = screen.getByTestId('select');

    act(() => {
      fireEvent.change(select, { target: { value: newValue } });
    });

    const options = screen.getAllByTestId(
      'select-option'
    ) as HTMLOptionElement[];

    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    expect(mockRouter).toMatchObject({
      asPath: `/`,
      pathname: '/',
      query: {},
    });
  });
});
