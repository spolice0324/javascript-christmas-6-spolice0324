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
  });
});
