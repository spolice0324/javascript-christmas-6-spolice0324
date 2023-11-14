import { INPUT_MESSAGE } from '../Util/constants';
import {
  validateName,
  validateDuplicate,
  validateCount,
  validateTotalCount,
  validateDate,
  validateDrink,
} from '../Util/validate';
import InputHandler from '../Util/inputHandler';

const InputView = {
  async readDate() {
    return InputHandler.dateHandler(INPUT_MESSAGE.DATE, validateDate);
  },

  async readOrder() {
    return InputHandler.orderHandler(INPUT_MESSAGE.ORDER, this.validateOrder);
  },

  validateOrder(order) {
    InputHandler.validateOrder(order, menu => {
      validateName(menu);
      validateDuplicate(menu);
      validateDrink(menu);
      validateCount(menu);
      validateTotalCount(menu);
    });
  },
};

export default InputView;
