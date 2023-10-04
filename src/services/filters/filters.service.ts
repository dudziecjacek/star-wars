import { Injectable } from '@angular/core';
import { ObjectType } from 'src/enums/object-type';
import { PeopleSubfilter } from 'src/enums/people-subfilter';
import { StarshipsSubfilter } from 'src/enums/starships-subfilter';
import { Filters } from 'src/models/filters';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public filters: Filters = {
    toggledFilter: PeopleSubfilter.HEIGHT,
    selectedPeopleFilter: PeopleSubfilter.HEIGHT,
    selectedStarshipsFilter: StarshipsSubfilter.CREW,
    main: { selected: ObjectType.PEOPLE, searched: ObjectType.NONE },
  };

  public setFilters(): void {
    this.filters.main.searched = this.filters.main.selected;

    this.filters.toggledFilter =
      this.filters.main.selected === ObjectType.PEOPLE
        ? this.filters.selectedPeopleFilter
        : this.filters.selectedStarshipsFilter;
  }
}
