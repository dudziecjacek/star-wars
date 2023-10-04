import { Component, Input } from '@angular/core';

import { PeopleSubfilter, StarshipsSubfilter } from 'src/app/enums';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  @Input({ required: true }) public person!: Person;
  @Input({ required: true }) public activeFilter!:
    | PeopleSubfilter
    | StarshipsSubfilter;

  protected peopleSubfilterEnum: typeof PeopleSubfilter = PeopleSubfilter;
}
