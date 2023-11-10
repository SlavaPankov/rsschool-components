import { IProductsContextData } from '../../context/productsContext';
import { Api } from '../../api/Api';

export async function getProductContext(): Promise<IProductsContextData> {
  const api = new Api();
  const response = await api.search('');
  return {
    products: response.products,
    isLoading: false,
    isPagination: false,
    total: response.total,
  };
}
