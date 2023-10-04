import { ResultEnum } from 'src/enums/result-enum';
import { SwapiAbstract } from './abstract-swapi';
import { PeopleSubfilter } from 'src/enums/people-subfilter';
import { StarshipsSubfilter } from 'src/enums/starships-subfilter';
import { Person } from 'src/models/person';
import { Starship } from 'src/models/starship';

describe('SwapiAbstract', () => {
  describe('getTwoDistinctRandomNumbersInRange method', () => {
    it('should return two distinct numbers within the given range', () => {
      const [num1, num2] = SwapiAbstract.getTwoDistinctRandomNumbersInRange(
        1,
        20
      );

      expect(num1).not.toEqual(num2);
      expect(num1).toBeGreaterThanOrEqual(1);
      expect(num1).toBeLessThanOrEqual(20);
      expect(num2).toBeGreaterThanOrEqual(1);
      expect(num2).toBeLessThanOrEqual(20);
    });
  });

  describe('SwapiAbstract', () => {
    describe('getTwoDistinctRandomNumbersInRange method', () => {
      it('should return two distinct strings within the given range', () => {
        const [num1, num2] = SwapiAbstract.getTwoDistinctRandomNumbersInRange(
          1,
          20
        );
        expect(num1).not.toEqual(num2);
        expect(+num1).toBeGreaterThanOrEqual(1); // converting string to number for comparison
        expect(+num1).toBeLessThanOrEqual(20);
        expect(+num2).toBeGreaterThanOrEqual(1);
        expect(+num2).toBeLessThanOrEqual(20);
      });
    });

    describe('determineWinner method', () => {
      it('should determine winner based on PeopleSubfilter', () => {
        const data: [Person, Person] = [
          { name: '', height: '160', mass: '50' },
          { name: '', height: '150', mass: '55' },
        ];

        let result = SwapiAbstract.determineWinner(
          data,
          PeopleSubfilter.HEIGHT
        );
        expect(result).toEqual(ResultEnum.ONE);

        result = SwapiAbstract.determineWinner(data, PeopleSubfilter.MASS);
        expect(result).toEqual(ResultEnum.TWO);
      });

      it('should determine winner based on StarshipsSubfilter', () => {
        const data: [Starship, Starship] = [
          { name: '', crew: '10', length: '1000' },
          { name: '', crew: '15', length: '900' },
        ];

        let result = SwapiAbstract.determineWinner(
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
