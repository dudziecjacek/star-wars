import { Person } from './person';

export interface GetPersonResponse {
  message: string;
  result: {
    properties: Person;
    description: string;
    _id: string;
    uid: string;
    __v: number;
  };
}
