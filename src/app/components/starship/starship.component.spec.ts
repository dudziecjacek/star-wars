import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { StarshipComponent } from './starship.component';
import { StarshipsSubfilter } from 'src/enums';

describe('StarshipComponent', () => {
  let component: StarshipComponent;
  let fixture: ComponentFixture<StarshipComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [StarshipComponent],
      imports: [MatCardModule],
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipComponent);
    component = fixture.componentInstance;
    component.starship = {
      name: 'Yoda',
      crew: '12',
      length: '77',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('starship actions', () => {
    it('should highlight the height attribute when activeFilter is set to height', () => {
      component.activeFilter = StarshipsSubfilter.CREW;
      fixture.detectChanges();
      const crewAttribute = fixture.nativeElement.querySelector(
        '[testId="crewAttribute"]'
      );

      expect(crewAttribute).toBeTruthy();
      expect(crewAttribute.classList).toContain('active');
    });

    it('should highlight the mass attribute when activeFilter is set to mass', () => {
      component.activeFilter = StarshipsSubfilter.LENGTH;
      fixture.detectChanges();
      const lengthAttribute = fixture.nativeElement.querySelector(
        '[testId="lengthAttribute"]'
      );

      expect(lengthAttribute).toBeTruthy();
      expect(lengthAttribute.classList).toContain('active');
    });
  });
});
