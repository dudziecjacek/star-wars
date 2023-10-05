import { ObjectType } from 'src/app/enums/object-type';
import { PeopleSubfilter } from 'src/app/enums/people-subfilter';
import { StarshipsSubfilter } from 'src/app/enums/starships-subfilter';

export interface Filters {
  selectedSubFilterType: PeopleSubfilter | StarshipsSubfilter;
  selectedPeopleFilter: PeopleSubfilter;
  selectedStarshipsFilter: StarshipsSubfilter;
  main: {
    selected: ObjectType;
    searched: ObjectType;
  };
}
