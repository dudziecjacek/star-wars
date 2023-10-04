import { TestBed } from '@angular/core/testing';
import { SwapiService } from './swapi.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpTestingController: HttpTestingController;

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

  describe('getPeople', () => {
    it('should fetch people data and map properties', () => {
      const mockResponse = prepareGetPeople()[0];

      service.getPeople('people', 1).subscribe((data) => {
        expect(data.name).toEqual('Yoda');
      });
      const req = httpTestingController.expectOne(
        'https://www.swapi.tech/api/people/1'
      );

      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });
  });

  describe('getPeopleArray', () => {
    it('should fetch two people data', () => {
      const mockResponses = prepareGetPeople();

      service.getPeopleArray('people').subscribe((data: any) => {
        expect(data[0].name).toEqual('Yoda');
        expect(data[1].name).toEqual('Han Solo');
      });

      const requests = httpTestingController.match((request: any) =>
        request.url.includes('https://www.swapi.tech/api/people/')
      );
      expect(requests[0].request.method).toEqual('GET');
      expect(requests[1].request.method).toEqual('GET');

      requests[0].flush(mockResponses[0]);
      requests[1].flush(mockResponses[1]);
    });
  });
});

function prepareGetPeople(): any {
  return [
    {
      result: {
        properties: {
          name: 'Yoda',
        },
      },
    },
    {
      result: {
        properties: {
          name: 'Han Solo',
        },
      },
    },
  ];
}
