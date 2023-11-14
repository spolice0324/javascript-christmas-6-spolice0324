import Discount from '../src/Domain/Discount';
import { DATE } from '../src/Util/constants';

describe('Discount 클래스 로직 테스트', () => {
  let discount;
  beforeEach(() => {
    discount = new Discount();
  });

  describe('isPeriod 메서드 테스트', () => {
    test('크리스마스 이벤트 기간 내에 있는 경우 할인이 올바르게 계산되어야 한다.', () => {
      const date = DATE.EVENT_START + 2;
      const result = discount.isPeriod(date);
      const expectedDiscount =
        -DATE.PERIOD_DISCOUNT + (date - 1) * -DATE.PER_DAY_DISCOUNT;
      expect(result).toBe(expectedDiscount);
    });

    test('크리스마스 이벤트 기간 외에 있는 경우 할인이 적용되지 않아야 한다.', () => {
      const date = DATE.EVENT_END + 1;
      const result = discount.isPeriod(date);
      expect(result).toBe(0);
    });
  });
});
