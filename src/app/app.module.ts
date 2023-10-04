import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { StarshipComponent } from './components/starship/starship.component';
import { PersonComponent } from './components/person/person.component';
import { CommonModule } from '@angular/common';
import { WinnerComponent } from './components/winner/winner.component';
import { FiltersService } from 'src/services/filters/filters.service';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    StarshipComponent,
    PersonComponent,
    WinnerComponent,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    CommonModule,
  ],
  providers: [FiltersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
