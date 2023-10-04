import { TestBed } from '@angular/core/testing';
import { FiltersService } from './filters.service';
import { ObjectType } from 'src/enums/object-type';
import { PeopleSubfilter } from 'src/enums/people-subfilter';
import { StarshipsSubfilter } from 'src/enums/starships-subfilter';

describe('FiltersService', () => {
  let service: FiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltersService],
    });
    service = TestBed.inject(FiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default filters set', () => {
    expect(service.filters.toggledFilter).toEqual(PeopleSubfilter.HEIGHT);
    expect(service.filters.selectedPeopleFilter).toEqual(
      PeopleSubfilter.HEIGHT
    );
    expect(service.filters.selectedStarshipsFilter).toEqual(
      StarshipsSubfilter.CREW
    );
    expect(service.filters.main.selected).toEqual(ObjectType.PEOPLE);
    expect(service.filters.main.searched).toEqual(ObjectType.NONE);
  });

  describe('setFilters method', () => {
    it('should update the filters based on the selected main filter for PEOPLE', () => {
      service.filters.main.selected = ObjectType.PEOPLE;
      service.setFilters();
      expect(service.filters.main.searched).toEqual(ObjectType.PEOPLE);
      expect(service.filters.toggledFilter).toEqual(
        service.filters.selectedPeopleFilter
      );
    });

    it('should update the filters based on the selected main filter for STARSHIPS', () => {
      service.filters.main.selected = ObjectType.STARSHIPS;
      service.setFilters();
      expect(service.filters.main.searched).toEqual(ObjectType.STARSHIPS);
      expect(service.filters.toggledFilter).toEqual(
        service.filters.selectedStarshipsFilter
      );
    });
  });
});
