import { ERROR_MESSAGE, MENU } from '../src/Util/constants';
import { validateDate, validateOrder } from '../src/Util/validateInput';

describe('Util 테스트', () => {
  describe('validateDate 함수', () => {
    test('1 이상 31 이하의 유효한 날짜는 예외를 발생시키지 않아야 한다.', () => {
      expect(() => validateDate(15)).not.toThrow();
    });

    test('1 미만 또는 31 초과의 날짜는 예외를 발생시켜야 한다.', () => {
      expect(() => validateDate(0)).toThrow(ERROR_MESSAGE.INVALID_DATE);
      expect(() => validateDate(32)).toThrow(ERROR_MESSAGE.INVALID_DATE);
    });

    test('숫자가 아닌 날짜는 예외를 발생시켜야 한다.', () => {
      expect(() => validateDate('a')).toThrow(ERROR_MESSAGE.INVALID_DATE);
    });

    test('자연수가 아닌 날짜는 예외를 발생시켜야 한다.', () => {
      expect(() => validateDate(1.1)).toThrow(ERROR_MESSAGE.INVALID_DATE);
      expect(() => validateDate(1.9)).toThrow(ERROR_MESSAGE.INVALID_DATE);
      expect(() => validateDate(-1)).toThrow(ERROR_MESSAGE.INVALID_DATE);
    });
  });

  describe('validateOrder 함수', () => {
    test('유효한 주문은 예외를 발생시키지 않아야 합니다.', () => {
      const validOrder = [
        ['아이스크림', 2],
        ['제로콜라', 1],
      ];
      expect(() => validateOrder(validOrder)).not.toThrow();
    });

    test('유효하지 않은 주문은 예외를 발생시켜야 합니다. - 없는 메뉴 ', () => {
      const invalidMenu = [['새우튀김', 1]];
      expect(() => validateOrder(invalidMenu)).toThrow(
        ERROR_MESSAGE.INVALID_ORDER,
      );
    });

    test('유효하지 않은 주문은 예외를 발생시켜야 합니다. - 수량 0 ', () => {
      const invalidCount = [['아이스크림', 0]];
      expect(() => validateOrder(invalidCount)).toThrow(
        ERROR_MESSAGE.INVALID_ORDER,
      );
    });

    const duplicateOrder = [
      ['아이스크림', 2],
      ['아이스크림', 1],
      ['제로콜라', 1],
    ];

    test('중복된 메뉴 주문은 예외를 발생시켜야 합니다.', () => {
      expect(() => validateOrder(duplicateOrder)).toThrow(
        ERROR_MESSAGE.INVALID_ORDER,
      );
    });

    test('음료만 주문한 경우 예외를 발생시켜야 합니다.', () => {
      const onlyDrinkOrder = [[MENU.제로콜라, 5]];
      expect(() => validateOrder(onlyDrinkOrder)).toThrow(
        ERROR_MESSAGE.INVALID_ORDER,
      );
    });

    test('총 메뉴 개수가 20을 초과하는 경우 예외를 발생시켜야 한다.', () => {
      const totalCountExceedOrder = Array.from({ length: 21 }, (_, index) => [
        '아이스크림',
        index,
      ]);
      expect(() => validateOrder(totalCountExceedOrder)).toThrow(
        ERROR_MESSAGE.INVALID_ORDER,
      );
    });
  });
});
