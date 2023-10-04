import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, map, tap } from 'rxjs';
import { SwapiAbstract } from '../abstract/abstract-swapi';
import { GetPersonResponse } from 'src/models/get-person-response';
import { Person } from 'src/models/person';
import { GetStarshipResponse } from 'src/models/get-starship-response';
import { Starship } from 'src/models/starship';
import { ObjectType } from 'src/enums/object-type';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  protected _getPersonResponse$: BehaviorSubject<[Person, Person] | null> =
    new BehaviorSubject<[Person, Person] | null>(null);
  protected _getStarshipResponse$: BehaviorSubject<
    [Starship, Starship] | null
  > = new BehaviorSubject<[Starship, Starship] | null>(null);

  private readonly http: HttpClient = inject(HttpClient);
  private static readonly BASE_URL: string = 'https://www.swapi.tech/api/';
  private static readonly PEOPLE_URL: string = `${SwapiService.BASE_URL}${ObjectType.PEOPLE}/`;
  private static readonly STARSHIPS_URL: string = `${SwapiService.BASE_URL}${ObjectType.STARSHIPS}/`;
  private static readonly ID_MAX_RANGE: number = 20;

  public getPerson(id: string): Observable<Person> {
    return this.http
      .get<GetPersonResponse>(SwapiService.PEOPLE_URL + id)
      .pipe(map((response: GetPersonResponse) => response.result.properties));
  }

  public getPeopleArray(): Observable<[Person, Person]> {
    const [firstId, secondId] =
      SwapiAbstract.getTwoDistinctRandomNumbersInRange(
        1,
        SwapiService.ID_MAX_RANGE
      );

    return forkJoin([this.getPerson(firstId), this.getPerson(secondId)]).pipe(
      tap(([data1, data2]) => {
        this._getPersonResponse$.next([data1, data2]);
      })
    );
  }

  public getStarship(id: string): Observable<Starship> {
    return this.http
      .get<GetStarshipResponse>(SwapiService.STARSHIPS_URL + id)
      .pipe(map((response: GetStarshipResponse) => response.result.properties));
  }

  public getStarshipsArray(): Observable<[Starship, Starship]> {
    const [firstId, secondId] =
      SwapiAbstract.getTwoDistinctRandomNumbersInRange(
        1,
        SwapiService.ID_MAX_RANGE
      );

    return forkJoin([
      this.getStarship(firstId),
      this.getStarship(secondId),
    ]).pipe(
      tap(([data1, data2]) => {
        this._getStarshipResponse$.next([data1, data2]);
      })
    );
  }

  public get getPersonResponse$(): Observable<[Person, Person]> {
    return this._getPersonResponse$.asObservable() as Observable<
      [Person, Person]
    >;
  }

  public get getStarshipResponse$(): Observable<[Starship, Starship]> {
    return this._getStarshipResponse$.asObservable() as Observable<
      [Starship, Starship]
    >;
  }
}