import { createContext, ReactNode, useContext, useMemo } from 'react';
import { IProduct } from '../types/interfaces/IProduct';
import { useProductsData } from '../hooks/useProductsData';
import { searchContext } from './searchContext';

interface IProductsContext {
  products: IProduct[];
  isLoading: boolean;
  isPagination: boolean;
  total: number;
}

export const productsContext = createContext<IProductsContext>({
  products: [],
  isLoading: false,
  isPagination: false,
  total: 0,
});

export function UseProductsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { search, limit, page } = useContext(searchContext);
  const { products, isLoading, isPagination, total } = useProductsData(
    search,
    page,
    limit
  );

  const productsProviderValue = useMemo(
    () => ({ products, isLoading, isPagination, total }),
    [products, isLoading]
  );

  return (
    <productsContext.Provider value={productsProviderValue}>
      {children}
    </productsContext.Provider>
  );
}
