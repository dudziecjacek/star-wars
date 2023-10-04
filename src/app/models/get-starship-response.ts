import { Starship } from './starship';

export interface GetStarshipResponse {
  message: string;
  result: {
    properties: Starship;
    description: string;
    _id: string;
    uid: string;
    __v: number;
  };
}
