import { Component, Input } from '@angular/core';
import { PeopleSubfilter } from 'src/enums/people-subfilter';
import { StarshipsSubfilter } from 'src/enums/starships-subfilter';
import { Starship } from 'src/models/starship';

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss'],
})
export class StarshipComponent {
  @Input({ required: true }) public starship!: Starship;
  @Input({ required: true }) public activeFilter!:
    | PeopleSubfilter
    | StarshipsSubfilter;
}
