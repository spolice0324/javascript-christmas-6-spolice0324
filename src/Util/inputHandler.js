import { Console } from '@woowacourse/mission-utils';
import parseInput from './parseInput';

const inputHandler = {
  async dateHandler(userInput, validate) {
    try {
      const input = await Console.readLineAsync(userInput);
      validate(Number(input));
      return Number(input);
    } catch (e) {
      Console.print(e.message);
      return this.dateHandler(userInput, validate);
    }
  },

  async orderHandler(userInput, validate) {
    try {
      const input = await Console.readLineAsync(userInput);
      const menu = parseInput(input);
      validate(menu);
      return Object.fromEntries(menu);
    } catch (e) {
      Console.print(e.message);
      return this.orderHandler(userInput, validate);
    }
  },
};

export default inputHandler;
