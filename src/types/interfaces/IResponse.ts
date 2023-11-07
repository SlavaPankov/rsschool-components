import { IProduct } from './IProduct';

export interface IResponse {
  total: number;
  skip: number;
  limit: number;
  products: IProduct[];
}
