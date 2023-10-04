import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, map, tap } from 'rxjs';
import { SwapiAbstract } from './abstract/abstract-swapi';
import { GetPeopleResponse } from 'src/models/get-people-response';
import { People } from 'src/models/people';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private readonly http: HttpClient = inject(HttpClient);
  protected _getPeopleResponse$: BehaviorSubject<[People, People]> =
    new BehaviorSubject<[People, People]>(this.prepareGetPeopleInitialValue());

  private static readonly BASE_URL: string = 'https://www.swapi.tech/api/';

  getPeople(type: string, id: string | number): Observable<People> {
    return this.http
      .get<GetPeopleResponse>(SwapiService.BASE_URL + `${type}/` + id)
      .pipe(map((response: GetPeopleResponse) => response.result.properties));
  }

  getPeopleArray(type: string): Observable<[People, People]> {
    const [firstId, secondId] =
      SwapiAbstract.getTwoDistinctRandomNumbersInRange(1, 50);

    return forkJoin([
      this.getPeople(type, firstId),
      this.getPeople(type, secondId),
    ]).pipe(
      tap(([data1, data2]) => {
        this._getPeopleResponse$.next([data1, data2]);
      })
    );
  }

  public get getPeopleResponse$(): Observable<[People, People]> {
    return this._getPeopleResponse$.asObservable();
  }

  private prepareGetPeopleInitialValue(): [People, People] {
    return [
      {
        name: '',
        height: '',
        mass: '',
      },
      {
        name: '',
        height: '',
        mass: '',
      },
    ];
  }
}
