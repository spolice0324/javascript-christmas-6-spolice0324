import { INPUT_MESSAGE } from '../Util/constants';
import { validateDate, validateOrder } from '../Util/validateInput';
import InputHandler from '../Util/inputHandler';

const InputView = {
  async readDate() {
    return InputHandler.dateHandler(INPUT_MESSAGE.DATE, validateDate);
  },

  async readOrder() {
    return InputHandler.orderHandler(INPUT_MESSAGE.ORDER, validateOrder);
  },
};

export default InputView;
