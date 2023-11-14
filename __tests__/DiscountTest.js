import Discount from '../src/Domain/Discount';
import { DATE, DISCOUNT } from '../src/Util/constants';

describe('Discount 클래스 로직 테스트', () => {
  let discount;
  beforeEach(() => {
    discount = new Discount();
  });

  describe('크리스마스 기간 이벤트 할인 메소드 테스트', () => {
    test('크리스마스 이벤트 기간 내에 있는 경우 할인이 올바르게 계산되어야 한다.', () => {
      const date = DATE.EVENT_START + 2;
      const result = discount.isPeriod(date);
      const expectedDiscount
        = -DATE.PERIOD_DISCOUNT + (date - 1) * -DATE.PER_DAY_DISCOUNT;
      expect(result).toBe(expectedDiscount);
    });

    test('크리스마스 이벤트 기간 외에 있는 경우 할인이 적용되지 않아야 한다.', () => {
      const date = DATE.EVENT_END + 1;
      const result = discount.isPeriod(date);
      expect(result).toBe(0);
    });
  });

  describe('평일 할인 메소드 테스트', () => {
    test('평일(일~목)이라면 주문 내역 중 디저트 메뉴를 할인하는 금액이 올바르게 계산되어야 한다. - 디저트 메뉴가 0개일 때', () => {
      const date = DATE.EVENT_START + 3;
      const menu = { 레드와인: 1, 해산물파스타: 1 };
      const result = discount.isWeekday(date, menu);
      const expectedDiscount = 0;
      expect(expectedDiscount).toBe(0);
    });
    test('평일(일~목)이라면 주문 내역 중 디저트 메뉴를 할인하는 금액이 올바르게 계산되어야 한다. - 디저트 메뉴가 1개일 때', () => {
      const date = DATE.EVENT_START + 3;
      const menu = { 초코케이크: 1, 레드와인: 1, 해산물파스타: 1 };
      const result = discount.isWeekday(date, menu);
      const expectedDiscount = -2023;
      expect(result).toBe(expectedDiscount);
    });
    test('평일(일~목)이라면 주문 내역 중 디저트 메뉴를 할인하는 금액이 올바르게 계산되어야 한다. - 디저트 메뉴가 여러개일 때', () => {
      const date = DATE.EVENT_START + 3;
      const menu = { 초코케이크: 4, 레드와인: 1, 해산물파스타: 1 };
      const result = discount.isWeekday(date, menu);
      const expectedDiscount = -2023 * 4;
      expect(result).toBe(expectedDiscount);
    });
  });

  describe('주말 할인 메소드 테스트', () => {
    test('주말(금~토)이라면 주문 내역 중 메인 메뉴를 할인하는 금액이 올바르게 계산되어야 한다. - 메인 메뉴가 0개일 때', () => {
      const date = DATE.EVENT_START + 1;
      const menu = { 초코케이크: 1, 레드와인: 1 };
      const result = discount.isWeekend(date, menu);
      const expectedDiscount = 0;
      expect(result).toBe(expectedDiscount);
    });
    test('주말(금~토)이라면 주문 내역 중 메인 메뉴를 할인하는 금액이 올바르게 계산되어야 한다. - 메인 메뉴가 1개일 때', () => {
      const date = DATE.EVENT_START + 1;
      const menu = { 해산물파스타: 1, 초코케이크: 1, 레드와인: 1 };
      const result = discount.isWeekend(date, menu);
      const expectedDiscount = -2023;
      expect(result).toBe(expectedDiscount);
    });
    test('주말(금~토)이라면 주문 내역 중 메인 메뉴를 할인하는 금액이 올바르게 계산되어야 한다. - 메인 메뉴가 여러개일 때', () => {
      const date = DATE.EVENT_START + 1;
      const menu = { 해산물파스타: 4, 초코케이크: 1, 레드와인: 1 };
      const result = discount.isWeekend(date, menu);
      const expectedDiscount = -2023 * 4;
      expect(result).toBe(expectedDiscount);
    });
  });
});
