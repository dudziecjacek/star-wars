import { TestBed } from '@angular/core/testing';
import { SwapiService } from './swapi.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GetPersonResponse } from 'src/models/get-person-response';
import { GetStarshipResponse } from 'src/models/get-starship-response';
import { ObjectType } from 'src/enums/object-type';

fdescribe('SwapiService', () => {
  let service: SwapiService;
  let httpTestingController: HttpTestingController;
  const urlBase: string = 'https://www.swapi.tech/api/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SwapiService],
    });

    service = TestBed.inject(SwapiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('people methods', () => {
    it('should fetch person data and map properties', () => {
      const mockResponse = prepareGetPerson()[0];

      service.getPerson('1').subscribe((data) => {
        expect(data.name).toEqual('Yoda');
      });
      const req = httpTestingController.expectOne(
        `${urlBase}${ObjectType.PEOPLE}/1`
      );

      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });

    it('should fetch two person data', () => {
      const mockResponses = prepareGetPerson();

      service.getPeopleArray().subscribe((data: any) => {
        expect(data[0].name).toEqual('Yoda');
        expect(data[1].name).toEqual('Han Solo');
      });

      const requests = httpTestingController.match((request: any) =>
        request.url.includes(`${urlBase}${ObjectType.PEOPLE}/`)
      );
      expect(requests[0].request.method).toEqual('GET');
      expect(requests[1].request.method).toEqual('GET');

      requests[0].flush(mockResponses[0]);
      requests[1].flush(mockResponses[1]);
    });
  });

  describe('starships methods', () => {
    it('should fetch starship data and map properties', () => {
      const mockResponse = prepareGetStarships()[0];

      service.getStarship('1').subscribe((data) => {
        expect(data.name).toEqual('Imperial');
      });
      const req = httpTestingController.expectOne(
        `${urlBase}${ObjectType.STARSHIPS}/1`
      );

      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });

    it('should fetch two person data', () => {
      const mockResponses = prepareGetStarships();

      service.getStarshipsArray().subscribe((data: any) => {
        expect(data[0].name).toEqual('Imperial');
        expect(data[1].name).toEqual('Corvette');
      });

      const requests = httpTestingController.match((request: any) =>
        request.url.includes(`${urlBase}${ObjectType.STARSHIPS}/`)
      );
      expect(requests[0].request.method).toEqual('GET');
      expect(requests[1].request.method).toEqual('GET');

      requests[0].flush(mockResponses[0]);
      requests[1].flush(mockResponses[1]);
    });
  });
});

function prepareGetPerson(): GetPersonResponse[] {
  return [
    {
      message: '',
      result: {
        properties: {
          name: 'Yoda',
          height: '',
          mass: '',
        },
        description: '',
        _id: '',
        uid: '',
        __v: 1,
      },
    },
    {
      message: '',
      result: {
        properties: {
          name: 'Han Solo',
          height: '',
          mass: '',
        },
        description: '',
        _id: '',
        uid: '',
        __v: 1,
      },
    },
  ];
}

function prepareGetStarships(): GetStarshipResponse[] {
  return [
    {
      message: '',
      result: {
        properties: {
          name: 'Imperial',
          crew: '',
          length: '',
        },
        description: '',
        _id: '',
        uid: '',
        __v: 1,
      },
    },
    {
      message: '',
      result: {
        properties: {
          name: 'Corvette',
          crew: '',
          length: '',
        },
        description: '',
        _id: '',
        uid: '',
        __v: 1,
      },
    },
  ];
}
