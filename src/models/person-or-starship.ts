import { Person } from './person';
import { Starship } from './starship';

export type PersonOrStarship = [Person, Person] | [Starship, Starship];
