import { IResponse } from '../types/interfaces/IResponse';
import { IProduct } from '../types/interfaces/IProduct';

interface IApi {
  baseUrl: string;
  searchEndpoint: string;
  search: (
    query: string,
    page?: number,
    countPerPage?: number
  ) => Promise<IResponse>;
  getProductById: (id: string) => Promise<IProduct>;
}

export class Api implements IApi {
  baseUrl = 'https://dummyjson.com/products';

  searchEndpoint = 'search';

  async getProductById(id: string): Promise<IProduct> {
    const response = await fetch(`${this.baseUrl}/${id}`);

    return response.json();
  }

  async search(query: string, page = 1, countPerPage = 10): Promise<IResponse> {
    const response = await fetch(
      `${this.baseUrl}/${this.searchEndpoint}?q=${query.trim()}&skip=${
        (page - 1) * countPerPage
      }&limit=${countPerPage}`
    );
    const { products, limit, skip, total }: IResponse = await response.json();

    return { products, limit, skip, total };
  }
}
