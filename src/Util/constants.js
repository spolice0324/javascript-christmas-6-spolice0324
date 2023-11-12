const INPUT_MESSAGE = Object.freeze({
  VISIT_DATE:
    '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해주세요!)\n',
  ORDER:
    '주문하실 메뉴와 메뉴 개수를 알려주세요. (예시 : 해산물파스타-2, 초코케이크-1)\n',
});

const OUTPUT_MESSAGE = Object.freeze({
  INTRO: '안녕하세요! 우테코 식당 12월 이벤트 플래너 입니다.\n',
  PREVIEW: (date) => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
  ORDER_MENU: '<주문 메뉴>\n',
  BEFORE_DISCOUNT: '<할인 전 총주문 금액>\n',
  AFTER_DISCOUNT: '<할인 후 예상 결제 금액>\n',
  GIFT: '<증정 메뉴>\n',
  BENEFITS: '<혜택 내역>\n',
  TOTAL_BENEFIT_AMOUNT: '<총혜택 금액>\n',
  EVENT_BADGE: '<12월 이벤트 배지>\n',
});

const WORD = Object.freeze({
  WON: '원',
  NONE: '없음',
  BADGE_STAR: '별',
  BADGE_TREE: '트리',
  BADGE_SANTA: '산타',
});

const MENU_KIND = Object.freeze({
  APPETIZER: '애피타이저',
  MAIN: '메인',
  DESSERT: '디저트',
  DRINK: '음료',
});

const MENU_ITEMS = Object.freeze({
  SOUP: { name: '양송이 수프', price: 6000 },
  TAPAS: { name: '타파스', price: 5500 },
  SALAD: { name: '시저샐러드', price: 8000 },
  STEAK: { name: '티본스테이크', price: 55000 },
  BARBEQUE: { name: '바비큐립', price: 55000 },
  SEAFOOD_PASTA: { name: '해산물파스타', price: 35000 },
  CHRISTMAS_PASTA: { name: '크리스마스 파스타', price: 25000 },
  DESSERT: { name: '초코케이크', price: 15000 },
  ICECREAM: { name: '아이스크림', price: 5000 },
  COKE: { name: '제로콜라', price: 3000 },
  WINE: { name: '레드와인', price: 60000 },
  CHAMPAGNE: { name: '샴페인', price: 25000 },
});

const MENU = Object.freeze({
  [MENU_KIND.APPETIZER]: [MENU_ITEMS.SOUP, MENU_ITEMS.TAPAS, MENU_ITEMS.SALAD],
  [MENU_KIND.MAIN]: [
    MENU_ITEMS.STEAK,
    MENU_ITEMS.BARBEQUE,
    MENU_ITEMS.SEAFOOD_PASTA,
    MENU_ITEMS.CHRISTMAS_PASTA,
  ],
  [MENU_KIND.DESSERT]: [MENU_ITEMS.DESSERT, MENU_ITEMS.ICECREAM],
  [MENU_KIND.DRINK]: [MENU_ITEMS.COKE, MENU_ITEMS.WINE, MENU_ITEMS.CHAMPAGNE],
});

const ERROR_MESSAGE = Object.freeze({
  INVALID_DATE: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  INVALID_UNKNOWN_MENU:
    '[ERROR] 유효하지 않은 주문입니다. (없는 메뉴) 다시 입력해 주세요.',
  INVALID_INPUT:
    '[ERROR] 유효하지 않은 주문입니다. (잘못된 입력) 다시 입력해 주세요.',
  INVALID_FORMAT:
    '[ERROR] 유효하지 않은 주문입니다. (잘못된 형식) 다시 입력해 주세요.',
  DUPLICATE_MENU:
    '[ERROR] 유효하지 않은 주문입니다. (중복된 메뉴) 다시 입력해 주세요.',
});

export { INPUT_MESSAGE, OUTPUT_MESSAGE, WORD, ERROR_MESSAGE, MENU };
