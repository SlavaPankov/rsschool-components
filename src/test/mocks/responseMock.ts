import { IResponse } from '../../types/interfaces/IResponse';
import { productMock } from './productMock';

export const responseMock: IResponse = {
  total: 0,
  skip: 0,
  limit: 0,
  products: Array(3)
    .fill(productMock)
    .map((item, index) => ({ ...item, id: index })),
};

export const emptyResponseMock: IResponse = {
  total: 0,
  skip: 0,
  limit: 0,
  products: [],
};
