import { Component, inject } from '@angular/core';
import { ObjectType } from 'src/enums/object-type';
import { PeopleSubfilter } from 'src/enums/people-subfilter';
import { StarshipsSubfilter } from 'src/enums/starships-subfilter';
import { FiltersService } from 'src/services/filters/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  private readonly filtersService: FiltersService = inject(FiltersService);

  protected objectTypeEnum: typeof ObjectType = ObjectType;
  protected peopleSubfilterEnum: typeof PeopleSubfilter = PeopleSubfilter;
  protected starshipsSubfilterEnum: typeof StarshipsSubfilter =
    StarshipsSubfilter;

  protected get filters() {
    return this.filtersService.filters;
  }
}
