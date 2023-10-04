import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { EMPTY, Observable, catchError, first, tap } from 'rxjs';
import { ObjectType } from 'src/enums/object-type';
import { ResultEnum } from 'src/enums/result-enum';
import { Person } from 'src/models/person';
import { Starship } from 'src/models/starship';
import { SwapiAbstract } from 'src/services/abstract/abstract-swapi';
import { FiltersService } from 'src/services/filters/filters.service';
import { SwapiService } from 'src/services/swapi/swapi.service';
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

  @ViewChild(WinnerComponent) winnerComponent!: WinnerComponent;

  private readonly swapiService: SwapiService = inject(SwapiService);
  private readonly filtersService: FiltersService = inject(FiltersService);
  private readonly changeDetector: ChangeDetectorRef =
    inject(ChangeDetectorRef);

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
          this.winner = SwapiAbstract.determineWinner(
            res,
            this.filters.toggledFilter
          );
          this.winnerComponent.updateScore(this.winner);
        }),
        catchError((error: HttpErrorResponse) => this.handleCatchError(error))
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
          this.winner = SwapiAbstract.determineWinner(
            res,
            this.filters.toggledFilter
          );
          this.winnerComponent.updateScore(this.winner);
        }),
        catchError((error: HttpErrorResponse) => this.handleCatchError(error))
      )
      .subscribe();
  }

  private handleCatchError(error: HttpErrorResponse): Observable<never> {
    this.errorMessage = error.message;
    this.changeDetector.detectChanges();
    return EMPTY;
  }

  protected get person$(): Observable<[Person, Person]> {
    return this.swapiService.getPersonResponse$;
  }

  protected get starship$(): Observable<[Starship, Starship]> {
    return this.swapiService.getStarshipResponse$;
  }

  protected get filters() {
    return this.filtersService.filters;
  }
}
