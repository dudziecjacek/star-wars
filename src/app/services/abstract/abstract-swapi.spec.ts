import { SwapiAbstract } from './abstract-swapi';
import { PeopleSubfilter, ResultEnum, StarshipsSubfilter } from 'src/app/enums';
import { Person, Starship } from 'src/app/models';

describe('SwapiAbstract', () => {
  describe('getTwoDistinctRandomNumbersInRange method', () => {
    it('should return two distinct numbers within the given range', () => {
      const [num1, num2] = SwapiAbstract.getTwoDistinctRandomNumbersInRange(
        1,
        10
      );

      expect(num1).not.toEqual(num2);
      expect(num1).toBeGreaterThanOrEqual(1);
      expect(num1).toBeLessThanOrEqual(10);
      expect(num2).toBeGreaterThanOrEqual(1);
      expect(num2).toBeLessThanOrEqual(10);
    });
  });

  describe('SwapiAbstract', () => {
    describe('getTwoDistinctRandomNumbersInRange method', () => {
      it('should return two distinct strings within the given range', () => {
        const [num1, num2] = SwapiAbstract.getTwoDistinctRandomNumbersInRange(
          1,
          10
        );
        expect(num1).not.toEqual(num2);
        expect(num1).toBeGreaterThanOrEqual(1);
        expect(num1).toBeLessThanOrEqual(10);
        expect(num2).toBeGreaterThanOrEqual(1);
        expect(num2).toBeLessThanOrEqual(10);
      });
    });

    describe('determineWinner method', () => {
      it('should determine winner based on PeopleSubfilter', () => {
        const data: [Person, Person] = preparePeopleArray();
        let result: ResultEnum = SwapiAbstract.determineWinner(
          data,
          PeopleSubfilter.HEIGHT
        );

        expect(result).toEqual(ResultEnum.ONE);

        result = SwapiAbstract.determineWinner(data, PeopleSubfilter.MASS);
        expect(result).toEqual(ResultEnum.TWO);
      });

      it('should determine winner based on StarshipsSubfilter', () => {
        const data: [Starship, Starship] = prepareStarshipsArray();

        let result: ResultEnum = SwapiAbstract.determineWinner(
          data,
          StarshipsSubfilter.CREW
        );
        expect(result).toEqual(ResultEnum.TWO);

        result = SwapiAbstract.determineWinner(data, StarshipsSubfilter.LENGTH);
        expect(result).toEqual(ResultEnum.ONE);
      });
    });
  });
});

function preparePeopleArray(): [Person, Person] {
  return [
    { name: '', height: '260', mass: '35' },
    { name: '', height: '150', mass: '55' },
  ];
}

function prepareStarshipsArray(): [Starship, Starship] {
  return [
    { name: '', crew: '10', length: '350' },
    { name: '', crew: '15', length: '244' },
  ];
}
