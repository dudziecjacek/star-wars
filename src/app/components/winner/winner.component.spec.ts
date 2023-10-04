import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerComponent } from './winner.component';
import { ResultEnum } from 'src/app/enums/result-enum';

describe('WinnerComponent', () => {
  let component: WinnerComponent;
  let fixture: ComponentFixture<WinnerComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [WinnerComponent],
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component template', () => {
    it('should inform about the win of player one when the winner is set to "one"', () => {
      component.winner = 'one';
      fixture.detectChanges();
      const winnerMessage =
        fixture.nativeElement.querySelector('[testId="winner"]').textContent;
      expect(winnerMessage).toContain('Player One Wins!');
    });

    it('should inform about the win of player two when the winner is set to "two"', () => {
      component.winner = 'two';
      fixture.detectChanges();
      const winnerMessage =
        fixture.nativeElement.querySelector('[testId="winner"]').textContent;
      expect(winnerMessage).toContain('Player Two Wins!');
    });

    it('should inform about the draw when the winner is set to "draw"', () => {
      component.winner = 'draw';
      fixture.detectChanges();
      const winnerMessage =
        fixture.nativeElement.querySelector('[testId="winner"]').textContent;
      expect(winnerMessage).toContain("It's a draw!");
    });
  });

  describe('update score', () => {
    it('should increment player one score when winner is set to "one"', () => {
      component.updateScore(ResultEnum.ONE);
      expect(component['playerOneScore']).toBe(1);
      expect(component['playerTwoScore']).toBe(0);
    });

    it('should increment player two score when winner is set to "two"', () => {
      component.updateScore(ResultEnum.TWO);
      expect(component['playerOneScore']).toBe(0);
      expect(component['playerTwoScore']).toBe(1);
    });

    it('should not change scores when result is "draw"', () => {
      component.updateScore(ResultEnum.DRAW);
      expect(component['playerOneScore']).toBe(0);
      expect(component['playerTwoScore']).toBe(0);
    });
  });
});
