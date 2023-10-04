import { People } from './people';

export interface GetPeopleResponse {
  message: string;
  result: {
    properties: People;
    description: string;
    _id: string;
    uid: string;
    __v: number;
  };
}
