import { ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { EMPTY, Observable, catchError, first, tap } from 'rxjs';

import {
  ObjectType,
  PeopleSubfilter,
  ResultEnum,
  StarshipsSubfilter,
} from 'src/app/enums';
import { Filters, Person, Starship } from 'src/app/models';
import { SwapiAbstract } from 'src/app/services/abstract/abstract-swapi';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { SwapiService } from 'src/app/services/swapi/swapi.service';
import { WinnerComponent } from './components/winner/winner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected isLoading: boolean = false;
  protected errorMessage: string = '';
  protected winner: ResultEnum = ResultEnum.NONE;

  @ViewChild(WinnerComponent) protected winnerComponent!: WinnerComponent;

  private readonly swapiService: SwapiService = inject(SwapiService);
  private readonly filtersService: FiltersService = inject(FiltersService);
  private readonly changeDetector: ChangeDetectorRef =
    inject(ChangeDetectorRef);
  private static readonly HTTP_ERROR_MESSAGE: string =
    'There was a problem with request. Try again';

  protected onClick(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.filtersService.setFilters();

    this.determineSearchType(this.filters.main.selected);
  }

  private determineSearchType(searchedFilter: ObjectType): any {
    searchedFilter === ObjectType.PEOPLE
      ? this.handlePeopleRequest()
      : this.handleStarshipsRequest();
  }

  private handlePeopleRequest(): void {
    this.swapiService
      .getPeopleArray()
      .pipe(
        first(),
        tap((res: [Person, Person]) => {
          this.isLoading = false;
          this.winner = SwapiAbstract.determinePeopleWinner(
            res,
            this.filters.selectedSubFilterType as PeopleSubfilter
          );
          this.winnerComponent.updateScore(this.winner);
        }),
        catchError(() => this.handleCatchError())
      )
      .subscribe();
  }

  private handleStarshipsRequest(): void {
    this.swapiService
      .getStarshipsArray()
      .pipe(
        first(),
        tap((res: [Starship, Starship]) => {
          this.isLoading = false;
          this.winner = SwapiAbstract.determineStarshipsWinner(
            res,
            this.filters.selectedSubFilterType as StarshipsSubfilter
          );
          this.winnerComponent.updateScore(this.winner);
        }),
        catchError(() => this.handleCatchError())
      )
      .subscribe();
  }

  private handleCatchError(): Observable<never> {
    this.errorMessage = AppComponent.HTTP_ERROR_MESSAGE;
    this.changeDetector.detectChanges();
    return EMPTY;
  }

  protected get person$(): Observable<[Person, Person]> {
    return this.swapiService.getPersonResponse$;
  }

  protected get starship$(): Observable<[Starship, Starship]> {
    return this.swapiService.getStarshipResponse$;
  }

  protected get filters(): Filters {
    return this.filtersService.filters;
  }
}
