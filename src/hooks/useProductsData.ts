import { useEffect, useState } from 'react';
import { IProduct } from '../types/interfaces/IProduct';
import { Api } from '../api/Api';

interface IUseProductsData {
  products: IProduct[];
  isLoading: boolean;
  isPagination: boolean;
  total: number;
}

export function useProductsData(
  query: string,
  page: number,
  limit: number
): IUseProductsData {
  const api = new Api();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPagination, setIsPagination] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    setIsLoading(true);
    api.search(query, page, limit).then((response) => {
      setProducts(response.products);
      setIsPagination(response.products.length < response.total);
      setIsLoading(false);
      setTotal(response.total);
    });
  }, [query, isMounted, page, limit]);

  return { products, isLoading, isPagination, total };
}
