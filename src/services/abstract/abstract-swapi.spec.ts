import { ResultEnum } from 'src/enums/result-enum';
import { SwapiAbstract } from './abstract-swapi';

fdescribe('SwapiAbstract', () => {
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

  describe('determineWinner method', () => {
    it('should return DRAW result if both inputs are "unknown"', () => {
      const result = SwapiAbstract.determineWinner('unknown', 'unknown');
      expect(result).toEqual(ResultEnum.DRAW);
    });

    it('should return ONE if the second input is "unknown" and the first is not', () => {
      const result = SwapiAbstract.determineWinner('15', 'unknown');
      expect(result).toEqual(ResultEnum.ONE);
    });

    it('should return TWO if the first input is "unknown" and the second is not', () => {
      const result = SwapiAbstract.determineWinner('unknown', '15');
      expect(result).toEqual(ResultEnum.TWO);
    });

    it('should correctly compare two number strings and return the result', () => {
      let result = SwapiAbstract.determineWinner('50', '20');
      expect(result).toEqual(ResultEnum.ONE);

      result = SwapiAbstract.determineWinner('20', '35');
      expect(result).toEqual(ResultEnum.TWO);

      result = SwapiAbstract.determineWinner('10', '10');
      expect(result).toEqual(ResultEnum.DRAW);

      result = SwapiAbstract.determineWinner('1,000', '777');
      expect(result).toEqual(ResultEnum.ONE);
    });
  });
});
