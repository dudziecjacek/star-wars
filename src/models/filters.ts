import { ObjectType } from 'src/enums/object-type';
import { PeopleSubfilter } from 'src/enums/people-subfilter';
import { StarshipsSubfilter } from 'src/enums/starships-subfilter';

export interface Filters {
  toggledFilter: PeopleSubfilter | StarshipsSubfilter;
  selectedPeopleFilter: PeopleSubfilter;
  selectedStarshipsFilter: StarshipsSubfilter;
  main: {
    selected: ObjectType;
    searched: ObjectType;
  };
}
