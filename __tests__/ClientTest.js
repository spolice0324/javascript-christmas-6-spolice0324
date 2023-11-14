import Client from '../src/Domain/Client';
import { DATE, DISCOUNT, INFO, MENU } from '../src/Util/constants';

describe('Client 클래스 로직 테스트', () => {
  let client;
  beforeEach(() => {
    const date = 25; // 예시로 고정된 날짜 사용
    const order = { 해산물파스타: 2, 레드와인: 1, 초코케이크: 2 }; // 예시로 고정된 주문 사용
    client = new Client(date, order);
  });

  describe('할인 혜택 계산 메소드 테스트', () => {
    test('할인이 올바르게 계산되어야 한다.', () => {
      const result = client.calculateBenefits();
      expect(result).toEqual({
        [DISCOUNT.CHRISTMAS]: -(
          DATE.PERIOD_DISCOUNT
          + DATE.PER_DAY_DISCOUNT * 24
        ),
        [DISCOUNT.WEEK]: -(INFO.WEEK_DISCOUNT * 2),
        [DISCOUNT.SPECIAL]: -DATE.SPECIAL_DISCOUNT,
      });
    });
  });

  describe('날짜 반환 메소드 테스트', () => {
    test('날짜가 올바르게 반환되어야 한다.', () => {
      const result = client.getDate();
      expect(result).toEqual(25);
    });
  });

  describe('주문 목록 반환 메소드 테스트', () => {
    test('주문 목록이 올바르게 반환되어야 한다.', () => {
      const result = client.getOrderList();
      expect(result).toEqual(
        '해산물파스타 2개\n레드와인 1개\n초코케이크 2개\n',
      );
    });
  });

  describe('할인 전 금액 반환 메소드 테스트', () => {
    test('할인 전 금액이 올바르게 반환되어야 한다.', () => {
      const result = client.getBeforeDiscount();
      expect(result).toEqual(
        MENU.해산물파스타.price * 2
          + MENU.레드와인.price
          + MENU.초코케이크.price * 2,
      );
    });
  });

  describe('증정 메뉴 반환 메소드 테스트', () => {
    test('증정 메뉴가 있는 경우, 올바르게 반환되어야 한다.', () => {
      const result = client.getGift();
      expect(result).toEqual(INFO.GIFT);
    });

    test('증정 메뉴가 없는 경우, 올바르게 반환되어야 한다.', () => {
      client = new Client(25, { 해산물파스타: 1, 초코케이크: 1 });
      const result = client.getGift();
      expect(result).toEqual(INFO.NONE);
    });
  });

  describe('혜택 목록 반환 메소드 테스트', () => {
    test('혜택 목록이 올바르게 반환되어야 한다.', () => {
      const result = client.getBenefitList();
      expect(result).toEqual(
        `크리스마스 디데이 할인: -${(
          DATE.PERIOD_DISCOUNT
          + DATE.PER_DAY_DISCOUNT * 24
        ).toLocaleString()}원\n평일 할인: -${(
          INFO.WEEK_DISCOUNT * 2
        ).toLocaleString()}원\n특별 할인: -${DATE.SPECIAL_DISCOUNT.toLocaleString()}원\n증정 이벤트: -${INFO.GIFT_PRICE.toLocaleString()}원\n`,
      );
    });

    test('혜택 목록이 없는 경우, 올바르게 반환되어야 한다.', () => {
      client = new Client(30, { 제로콜라: 1, 초코케이크: 1 });
      const result = client.getBenefitList();
      expect(result).toEqual(INFO.NONE);
    });
  });

  describe('할인 금액 반환 메소드 테스트', () => {
    test('할인 금액이 올바르게 반환되어야 한다.', () => {
      const result = client.getDiscountAmount();
      const expectedResult = -(
        DATE.PERIOD_DISCOUNT
        + DATE.PER_DAY_DISCOUNT * 24
        + INFO.WEEK_DISCOUNT * 2
        + DATE.SPECIAL_DISCOUNT
        + INFO.GIFT_PRICE
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('할인 후 금액 반환 메소드 테스트', () => {
    test('할인 후 금액이 올바르게 반환되어야 한다.', () => {
      const result = client.getAfterDiscount();
      let expectedResult
        = client.getBeforeDiscount() + client.getDiscountAmount();
      if (client.getGift() !== INFO.NONE) {
        expectedResult += INFO.GIFT_PRICE;
      }
      expect(result).toEqual(expectedResult);
    });
  });

  describe('이벤트 배지 반환 메소드 테스트', () => {
    test('총 혜택금액 2만원 이상인 경우 산타 배지가 반환되어야 한다.', () => {
      const result = client.getEventBadge();
      expect(result).toEqual(INFO.BADGE.SANTA.NAME);
    });

    test('총 혜택금액 1만원 이상인 경우 트리 배지가 반환되어야 한다.', () => {
      client = new Client(15, { 크리스마스파스타: 4 });
      const result = client.getEventBadge();
      expect(result).toEqual(INFO.BADGE.TREE.NAME);
    });

    test('총 혜택금액 5천원 이상인 경우 별 배지가 반환되어야 한다.', () => {
      client = new Client(8, { 해산물파스타: 2, 초코케이크: 3 });
      const result = client.getEventBadge();
      expect(result).toEqual(INFO.BADGE.STAR.NAME);
    });
  });
});
