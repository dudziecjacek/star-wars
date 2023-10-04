import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { SwapiService } from 'src/app/services/swapi/swapi.service';
import { FiltersComponent } from './components/filters/filters.component';
import { StarshipComponent } from './components/starship/starship.component';
import { WinnerComponent } from './components/winner/winner.component';
import { PersonComponent } from './components/person/person.component';
import { Filters, Person, Starship } from 'src/app/models';
import { ObjectType, PeopleSubfilter, StarshipsSubfilter } from 'src/app/enums';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockSwapiService: jasmine.SpyObj<SwapiService>;
  let mockFiltersService: jasmine.SpyObj<FiltersService>;

  beforeEach(() => {
    mockSwapiService = jasmine.createSpyObj('SwapiService', [
      'getPeopleArray',
      'getStarshipsArray',
      'getPersonResponse$',
      'getStarshipResponse$',
    ]);
    mockFiltersService = jasmine.createSpyObj('FiltersService', ['setFilters']);

    mockFiltersService.filters = prepareFilters();

    mockSwapiService.getPeopleArray.and.returnValue(of(mockPersonArray()));
    mockSwapiService.getStarshipsArray.and.returnValue(of(mockStarshipArray()));

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FiltersComponent,
        PersonComponent,
        WinnerComponent,
        StarshipComponent,
      ],
      imports: [MatButtonToggleModule],
      providers: [
        { provide: SwapiService, useValue: mockSwapiService },
        { provide: FiltersService, useValue: mockFiltersService },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    mockSwapiService = TestBed.inject(
      SwapiService
    ) as jasmine.SpyObj<SwapiService>;
    mockFiltersService = TestBed.inject(
      FiltersService
    ) as jasmine.SpyObj<FiltersService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onClick method', () => {
    it('should call loadData method', () => {
      const loadDataSpy = spyOn(component, <never>'loadData');
      component['onClick']();
      expect(loadDataSpy).toHaveBeenCalled();
    });
  });

  describe('loadData method', () => {
    it('should set isLoading to true and call the determineSearchType method', () => {
      const determineSearchTypeSpy: jasmine.Spy = spyOn(
        component,
        <never>'determineSearchType'
      );

      component['onClick']();
      expect(component['isLoading']).toBeTrue();
      expect(determineSearchTypeSpy).toHaveBeenCalledWith(ObjectType.PEOPLE);
    });
  });
});

function prepareFilters(): Filters {
  return {
    toggledFilter: PeopleSubfilter.HEIGHT,
    selectedPeopleFilter: PeopleSubfilter.HEIGHT,
    selectedStarshipsFilter: StarshipsSubfilter.CREW,
    main: { selected: ObjectType.PEOPLE, searched: ObjectType.NONE },
  };
}

function mockPersonArray(): [Person, Person] {
  return [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
    },
  ];
}
function mockStarshipArray(): [Starship, Starship] {
  return [
    {
      name: 'Millennium Falcon',
      crew: '4',
      length: '34.37',
    },
    {
      name: 'Star Destroyer',
      crew: '47,060',
      length: '1,600',
    },
  ];
}
