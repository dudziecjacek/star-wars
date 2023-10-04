import { PeopleSubfilter } from 'src/enums/people-subfilter';
import { ResultEnum } from 'src/enums/result-enum';
import { StarshipsSubfilter } from 'src/enums/starships-subfilter';
import { Person } from 'src/models/person';
import { PersonOrStarship } from 'src/models/person-or-starship';
import { Starship } from 'src/models/starship';

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
    res: PersonOrStarship,
    toggledFilter: PeopleSubfilter | StarshipsSubfilter
  ) {
    if (toggledFilter in PeopleSubfilter) {
      return SwapiAbstract.calculateHigherValue(
        (res[0] as Person)[toggledFilter as keyof Person],
        (res[1] as Person)[toggledFilter as keyof Person]
      );
    } else {
      return SwapiAbstract.calculateHigherValue(
        (res[0] as Starship)[toggledFilter as keyof Starship],
        (res[1] as Starship)[toggledFilter as keyof Starship]
      );
    }
  }

  private static calculateHigherValue(
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
