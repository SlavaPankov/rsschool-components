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
  getProductById: (id: string) => Promise<IProduct | null>;
}

export class Api implements IApi {
  baseUrl = 'https://dummyjson.com/products';

  searchEndpoint = 'search';

  async getProductById(id: string): Promise<IProduct | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      return null;
    }
  }

  async search(query: string, page = 1, countPerPage = 10): Promise<IResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.searchEndpoint}?q=${query.trim()}&skip=${
          (page - 1) * countPerPage
        }&limit=${countPerPage}`
      );
      if (!response.ok) {
        return {
          products: [],
          limit: countPerPage,
          skip: (page - 1) * countPerPage,
          total: 0,
        };
      }

      const { products, limit, skip, total }: IResponse = await response.json();

      return { products, limit, skip, total };
    } catch (error) {
      return {
        products: [],
        limit: countPerPage,
        skip: (page - 1) * countPerPage,
        total: 0,
      };
    }
  }
}
