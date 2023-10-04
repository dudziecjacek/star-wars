import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

import { FiltersComponent } from './filters.component';
import { FiltersService } from 'src/services/filters/filters.service';
import { ObjectType, PeopleSubfilter, StarshipsSubfilter } from 'src/enums';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let mockFiltersService: Partial<FiltersService>;

  mockFiltersService = {
    filters: {
      toggledFilter: PeopleSubfilter.HEIGHT,
      selectedPeopleFilter: PeopleSubfilter.HEIGHT,
      selectedStarshipsFilter: StarshipsSubfilter.CREW,
      main: { selected: ObjectType.PEOPLE, searched: ObjectType.NONE },
    },
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      imports: [MatButtonToggleModule, FormsModule],
      providers: [{ provide: FiltersService, useValue: mockFiltersService }],
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filters actions', () => {
    it('should display people filters when PEOPLE is selected', () => {
      component['filters'].main.selected = ObjectType.PEOPLE;
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('[testId="peopleHeightFilter"]')
      ).toBeTruthy();
      expect(
        fixture.nativeElement.querySelector('[testId="peopleMassFilter"]')
      ).toBeTruthy();
    });

    it('should display starships filters when STARSHIPS is selected', () => {
      component['filters'].main.selected = ObjectType.STARSHIPS;
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('[testId="starshipsCrewFilter"]')
      ).toBeTruthy();
      expect(
        fixture.nativeElement.querySelector('[testId="starshipsLengthFilter"]')
      ).toBeTruthy();
    });
  });
});
