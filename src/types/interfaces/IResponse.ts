import { IPerson } from './IPerson';

export interface IResponse {
  count: number;
  previous: string;
  next: string;
  results: IPerson[];
}
