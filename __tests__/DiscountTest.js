import Discount from '../src/Domain/Discount';
import { DATE, DISCOUNT, INFO } from '../src/Util/constants';

describe('Discount 클래스 로직 테스트', () => {
  let discount;
  beforeEach(() => {
    discount = new Discount();
  });

  describe('크리스마스 기간 이벤트 할인 메소드 테스트', () => {
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

  describe('평일 할인 메소드 테스트', () => {
    test('평일(일~목)이라면 주문 내역 중 디저트 메뉴를 할인하는 금액이 올바르게 계산되어야 한다. - 디저트 메뉴가 0개일 때', () => {
      const date = DATE.EVENT_START + 3;
      const menu = { 레드와인: 1, 해산물파스타: 1 };
      const result = discount.isWeekday(date, menu);
      const expectedDiscount = 0;
      expect(result).toBe(expectedDiscount);
    });
    test('평일(일~목)이라면 주문 내역 중 디저트 메뉴를 할인하는 금액이 올바르게 계산되어야 한다. - 디저트 메뉴가 1개일 때', () => {
      const date = DATE.EVENT_START + 3;
      const menu = { 초코케이크: 1, 레드와인: 1, 해산물파스타: 1 };
      const result = discount.isWeekday(date, menu);
      const expectedDiscount = -INFO.WEEK_DISCOUNT;
      expect(result).toBe(expectedDiscount);
    });
    test('평일(일~목)이라면 주문 내역 중 디저트 메뉴를 할인하는 금액이 올바르게 계산되어야 한다. - 디저트 메뉴가 여러개일 때', () => {
      const date = DATE.EVENT_START + 3;
      const menu = { 초코케이크: 4, 레드와인: 1, 해산물파스타: 1 };
      const result = discount.isWeekday(date, menu);
      const expectedDiscount = -INFO.WEEK_DISCOUNT * 4;
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
      const expectedDiscount = -INFO.WEEK_DISCOUNT;
      expect(result).toBe(expectedDiscount);
    });
    test('주말(금~토)이라면 주문 내역 중 메인 메뉴를 할인하는 금액이 올바르게 계산되어야 한다. - 메인 메뉴가 여러개일 때', () => {
      const date = DATE.EVENT_START + 1;
      const menu = { 해산물파스타: 4, 초코케이크: 1, 레드와인: 1 };
      const result = discount.isWeekend(date, menu);
      const expectedDiscount = -INFO.WEEK_DISCOUNT * 4;
      expect(result).toBe(expectedDiscount);
    });
  });

  describe('특별 할인 메소드 테스트', () => {
    test('특별 할인 날짜라면 할인 금액이 올바르게 계산되어야 한다.', () => {
      const date = DATE.SPECIAL_DATE[0];
      const result = discount.isSpecialDay(date);
      const expectedDiscount = -DATE.SPECIAL_DISCOUNT;
      expect(result).toBe(expectedDiscount);
    });
    test('특별 할인 날짜가 아니라면 할인 금액이 0원이 되어야 한다.', () => {
      const date = DATE.SPECIAL_DATE[0] + 1;
      const result = discount.isSpecialDay(date);
      const expectedDiscount = 0;
      expect(result).toBe(expectedDiscount);
    });
  });

  describe('할인 금액 계산 메소드 테스트', () => {
    test('크리스마스 이벤트 기간 할인이 올바르게 계산되어야 합니다.', () => {
      const date = DATE.EVENT_START;
      const menu = {};
      const result = discount.calculateDiscount(date, menu);
      expect(result[DISCOUNT.CHRISTMAS]).toBe(-DATE.PERIOD_DISCOUNT);
    });

    test('평일 할인이 올바르게 계산되어야 합니다.', () => {
      const date = DATE.EVENT_START + 3;
      const menu = { 초코케이크: 4, 레드와인: 1, 해산물파스타: 1 };
      const result = discount.calculateDiscount(date, menu);
      expect(result[DISCOUNT.WEEK]).toBe(-INFO.WEEK_DISCOUNT * 4);
    });

    test('주말 할인이 올바르게 계산되어야 합니다.', () => {
      const date = DATE.EVENT_START + 1;
      const menu = { 초코케이크: 4, 레드와인: 1, 해산물파스타: 1 };
      const result = discount.calculateDiscount(date, menu);
      expect(result[DISCOUNT.WEEKEND]).toBe(-INFO.WEEK_DISCOUNT * 1);
    });

    test('특별 할인이 올바르게 계산되어야 합니다.', () => {
      const date = DATE.SPECIAL_DATE[0];
      const menu = {};
      const result = discount.calculateDiscount(date, menu);
      expect(result[DISCOUNT.SPECIAL]).toBe(-DATE.SPECIAL_DISCOUNT);
    });

    test('할인 금액이 올바르게 계산되어야 한다.', () => {
      const date = DATE.EVENT_START + 2;
      const menu = { 초코케이크: 4, 레드와인: 1, 해산물파스타: 1 };
      const result = discount.calculateDiscount(date, menu);
      const expectedDiscount = {
        '크리스마스 디데이 할인':
          -DATE.PERIOD_DISCOUNT + (date - 1) * -DATE.PER_DAY_DISCOUNT,
        '평일 할인': -INFO.WEEK_DISCOUNT * 4,
        '특별 할인': -1000,
      };
      expect(result).toEqual(expectedDiscount);
    });
  });
});
