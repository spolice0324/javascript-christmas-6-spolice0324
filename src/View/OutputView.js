import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../Util/constants';

const OutputView = {
  printIntro() {
    Console.print(OUTPUT_MESSAGE.INTRO);
  },
  printMenuTitle() {
    Console.print(OUTPUT_MESSAGE.ORDER_MENU);
  },
  printBeforeDiscount() {
    Console.print(OUTPUT_MESSAGE.BEFORE_DISCOUNT);
  },
  printAfterDiscount() {
    Console.print(OUTPUT_MESSAGE.AFTER_DISCOUNT);
  },
  printGift() {
    Console.print(OUTPUT_MESSAGE.GIFT);
  },
  printBenefits() {
    Console.print(OUTPUT_MESSAGE.BENEFITS);
  },
  printTotalBenefitAmount() {
    Console.print(OUTPUT_MESSAGE.TOTAL_BENEFIT_AMOUNT);
  },
  printEventBadge() {
    Console.print(OUTPUT_MESSAGE.EVENT_BADGE);
  },
  printPreview(date) {
    Console.print(OUTPUT_MESSAGE.PREVIEW(date));
  },
};

export default OutputView;
