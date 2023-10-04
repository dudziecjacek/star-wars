import { Component, Input } from '@angular/core';

import { ResultEnum } from 'src/app/enums/result-enum';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss'],
})
export class WinnerComponent {
  @Input({ required: true }) public winner!: string;

  protected playerOneScore: number = 0;
  protected playerTwoScore: number = 0;

  public updateScore(winner: ResultEnum) {
    if (winner === ResultEnum.ONE) {
      this.playerOneScore += 1;
    } else if (winner === ResultEnum.TWO) {
      this.playerTwoScore += 1;
    }
  }
}
