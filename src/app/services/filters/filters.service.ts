import { Injectable } from '@angular/core';

import { ObjectType, PeopleSubfilter, StarshipsSubfilter } from 'src/app/enums';
import { Filters } from 'src/app/models';

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
