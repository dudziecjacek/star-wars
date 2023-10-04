import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { PeopleSubfilter } from 'src/enums/people-subfilter';
import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
      imports: [MatCardModule],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = {
      name: 'Yoda',
      height: '172',
      mass: '77',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight the height attribute when activeFilter is set to height', () => {
    component.activeFilter = PeopleSubfilter.HEIGHT;
    fixture.detectChanges();
    const heightAttribute = fixture.nativeElement.querySelector(
      '[testId="heightAttribute"]'
    );

    expect(heightAttribute).toBeTruthy();
    expect(heightAttribute.classList).toContain('active');
  });

  it('should highlight the mass attribute when activeFilter is set to mass', () => {
    component.activeFilter = PeopleSubfilter.MASS;
    fixture.detectChanges();
    const massAttribute = fixture.nativeElement.querySelector(
      '[testId="massAttribute"]'
    );

    expect(massAttribute).toBeTruthy();
    expect(massAttribute.classList).toContain('active');
  });
});
