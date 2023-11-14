import { Console } from '@woowacourse/mission-utils';
import { INFO, OUTPUT_MESSAGE } from '../Util/constants';

const OutputView = {
  printIntro() {
    Console.print(`${OUTPUT_MESSAGE.INTRO}\n`);
  },

  printPreview(date) {
    Console.print(`${OUTPUT_MESSAGE.TITLE.PREVIEW(date)}`);
  },

  printMenuTitle(client) {
    Console.print(
      `${OUTPUT_MESSAGE.TITLE.ORDER_MENU}\n${client.getOrderList()}\n`,
    );
  },
  printBeforeDiscount(client) {
    const output = `${OUTPUT_MESSAGE.TITLE.BEFORE_DISCOUNT}\n${client
      .getBeforeDiscount()
      .toLocaleString()}${INFO.UNIT}\n`;
    Console.print(output);
  },

  printGift(client) {
    Console.print(`${OUTPUT_MESSAGE.TITLE.GIFT}\n${client.getGift()}\n`);
  },

  printBenefit(client) {
    const output = `${
      OUTPUT_MESSAGE.TITLE.BENEFIT
    }\n${client.getBenefitList()}\n`;
    Console.print(output);
  },

  printDiscountAmount(client) {
    const output = `${OUTPUT_MESSAGE.TITLE.BENEFIT_AMOUNT}\n${client
      .getDiscountAmount()
      .toLocaleString()}${INFO.UNIT}\n`;
    Console.print(output);
  },

  printAfterDiscount(client) {
    const output = `${OUTPUT_MESSAGE.TITLE.AFTER_DISCOUNT}\n${client
      .getAfterDiscount()
      .toLocaleString()}${INFO.UNIT}\n`;
    Console.print(output);
  },

  printEventBadge(client) {
    Console.print(`${OUTPUT_MESSAGE.TITLE.BADGE}\n${client.getEventBadge()}\n`);
  },
};

export default OutputView;
