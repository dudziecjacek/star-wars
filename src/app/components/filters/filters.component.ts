import { Component, inject } from '@angular/core';

import { ObjectType, PeopleSubfilter, StarshipsSubfilter } from 'src/app/enums';
import { Filters } from 'src/app/models';
import { FiltersService } from 'src/app/services/filters/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  protected objectTypeEnum: typeof ObjectType = ObjectType;
  protected peopleSubfilterEnum: typeof PeopleSubfilter = PeopleSubfilter;
  protected starshipsSubfilterEnum: typeof StarshipsSubfilter =
    StarshipsSubfilter;

  private readonly filtersService: FiltersService = inject(FiltersService);

  protected get filters(): Filters {
    return this.filtersService.filters;
  }
}
