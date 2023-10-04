import { ResultEnum } from 'src/enums/result-enum';

export abstract class SwapiAbstract {
  private static readonly UNKNOWN = 'unknown';

  public static getTwoDistinctRandomNumbersInRange(
    min: number,
    max: number
  ): string[] {
    let firstNumber = this.getRandomInt(min, max);
    let secondNumber;
    do {
      secondNumber = this.getRandomInt(min, max);
    } while (firstNumber === secondNumber);
    return [String(firstNumber), String(secondNumber)];
  }

  public static determineWinner(
    firstString: string,
    secondString: string
  ): ResultEnum {
    if (
      firstString === SwapiAbstract.UNKNOWN &&
      secondString === SwapiAbstract.UNKNOWN
    ) {
      return ResultEnum.DRAW;
    }
    if (firstString === SwapiAbstract.UNKNOWN) {
      return ResultEnum.TWO;
    }
    if (secondString === SwapiAbstract.UNKNOWN) {
      return ResultEnum.ONE;
    }

    const firstNumber: number = Number(firstString?.replace(',', ''));
    const secondNumber: number = Number(secondString?.replace(',', ''));

    if (firstNumber > secondNumber) {
      return ResultEnum.ONE;
    }
    if (firstNumber < secondNumber) {
      return ResultEnum.TWO;
    }
    return ResultEnum.DRAW;
  }

  private static getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
