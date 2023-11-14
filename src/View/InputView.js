import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../Util/constants';
import {
  validateName,
  validateDuplicate,
  validateDrink,
  validateCount,
  validateTotalCount,
  validateDate,
} from '../Util/validate';

import parseInput from '../Util/parseInput';

const InputView = {
  async readDate() {
    try {
      const input = await Console.readLineAsync(INPUT_MESSAGE.DATE);
      validateDate(Number(input));
      return Number(input);
    } catch (e) {
      Console.print(e.message);
      return this.readDate();
    }
  },

  async readOrder() {
    try {
      const input = await Console.readLineAsync(INPUT_MESSAGE.ORDER);
      const menu = parseInput(input);
      this.validateOrder(menu);
      return Object.fromEntries(menu);
    } catch (e) {
      Console.print(e.message);
      return this.readOrder();
    }
  },

  validateOrder(menu) {
    validateName(menu);
    validateDuplicate(menu);
    validateDrink(menu);
    validateCount(menu);
    validateTotalCount(menu);
  },
};

export default InputView;
