import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../Util/constants';

const getInputWithValidate = async (userInput, validate) => {
  const input = await userInput();
  validate(input);
  return input;
};

const InputView = {
  async readDate() {
    const date = await getInputWithValidate(
      async () => Console.readLineAsync(INPUT_MESSAGE.DATE),
      // validateDate,
    );
    return Number(date);
  },

  async readOrder() {
    const order = await getInputWithValidate(
      async () => Console.readLineAsync(INPUT_MESSAGE.ORDER),
      // validateOrder,
    );
    return order;
  },
};

export default InputView;
