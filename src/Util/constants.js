const MENU_TYPE = Object.freeze({
  APPETIZER: '애피타이저',
  MAIN: '메인',
  DESSERT: '디저트',
  DRINK: '음료',
});

const MENU = Object.freeze({
  양송이수프: { price: 6000, type: MENU_TYPE.APPETIZER },
  타파스: { price: 5500, type: MENU_TYPE.APPETIZER },
  시저샐러드: { price: 8000, type: MENU_TYPE.APPETIZER },
  티본스테이크: { price: 55000, type: MENU_TYPE.MAIN },
  바비큐립: { price: 54000, type: MENU_TYPE.MAIN },
  해산물파스타: { price: 35000, type: MENU_TYPE.MAIN },
  크리스마스파스타: { price: 25000, type: MENU_TYPE.MAIN },
  초코케이크: { price: 15000, type: MENU_TYPE.DESSERT },
  아이스크림: { price: 5000, type: MENU_TYPE.DESSERT },
  제로콜라: { price: 3000, type: MENU_TYPE.DRINK },
  레드와인: { price: 60000, type: MENU_TYPE.DRINK },
  샴페인: { price: 25000, type: MENU_TYPE.DRINK },
});

const DATE = Object.freeze({
  EVNET_START: 1,
  EVENT_END: 25,
  PERIOD_DISCOUNT: 1000,
  PER_DAY_DISCOUNT: 100,
});

const INFO = Object.freeze({
  UNIT: '원',
  WEEK_DISCOUNT: 2023,
  SPECIAL_DISCOUNT: [3, 10, 17, 24, 25, 31],
  ORDER_MINIMUM: 10000,
  GIFT_CONDITION: 120000,
  GIFT: '샴페인 1개',
  NONE: '없음',
  BADGE: {
    SANTA: { PRICE: 20000, NAME: '산타' },
    TREE: { PRICE: 10000, NAME: '트리' },
    STAR: { PRICE: 5000, NAME: '별' },
  },
});

const DISCOUNT = Object.freeze({
  CHRISTMAS: '크리스마스 디데이 할인',
  WEEK: '평일 할인',
  WEEKEND: '주말 할인',
  SPECIAL: '특별 할인',
});

const INPUT_MESSAGE = Object.freeze({
  DATE: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  ORDER:
    '주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

const OUTPUT_MESSAGE = Object.freeze({
  INTRO: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n',
  TITLE: {
    PREVIEW: date =>
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리보기!\n`,
    ORDER_MENU: '<주문 메뉴>',
    BEFORE_DISCOUNT: '<할인 전 총주문 금액>',
    AFTER_DISCOUNT: '<할인 후 예상 결제 금액>',
    GIFT: '<증정 메뉴>',
    BENEFIT: '<혜택 내역>',
    BENEFIT_AMOUNT: '<총혜택 금액>',
    BADGE: '<12월 이벤트 배지>',
  },
});

const ERROR_MESSAGE = Object.freeze({
  INVALID_DATE: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  INVALID_ORDER: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
});

export {
  MENU_TYPE,
  MENU,
  DATE,
  INFO,
  DISCOUNT,
  INPUT_MESSAGE,
  OUTPUT_MESSAGE,
  ERROR_MESSAGE,
};
