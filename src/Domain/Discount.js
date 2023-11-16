import { DATE, DISCOUNT, INFO, MENU, MENU_KIND } from '../Util/constants';

class Discount {
  calculateDiscount(date, menu) {
    const discount = {};
    const addDisCount = (key, value) => {
      if (value !== 0) discount[key] = value;
    };

    addDisCount(DISCOUNT.CHRISTMAS, this.isPeriod(date));
    addDisCount(DISCOUNT.WEEK, this.isWeekday(date, menu));
    addDisCount(DISCOUNT.WEEKEND, this.isWeekend(date, menu));
    addDisCount(DISCOUNT.SPECIAL, this.isSpecialDay(date));
    return discount;
  }

  isPeriod(date) {
    let periodDiscount = 0;
    if (date >= DATE.EVENT_START && date <= DATE.EVENT_END) {
      periodDiscount +=
        -DATE.PERIOD_DISCOUNT + (date - 1) * -DATE.PER_DAY_DISCOUNT;
    }
    return periodDiscount;
  }

  isWeekday(date, menu) {
    let weekDisCount = 0;
    if (!(date % 7 === 1 || date % 7 === 2)) {
      let count = 0;
      Object.keys(menu).forEach(name => {
        if (MENU[name].kind === MENU_KIND.DESSERT) count += menu[name];
      });
      weekDisCount += -INFO.WEEK_DISCOUNT * count;
    }
    return weekDisCount;
  }

  isWeekend(date, menu) {
    let weekendDisCount = 0;
    if (date % 7 === 1 || date % 7 === 2) {
      let count = 0;
      Object.keys(menu).forEach(name => {
        if (MENU[name].kind === MENU_KIND.MAIN) count += menu[name];
      });
      weekendDisCount += -INFO.WEEK_DISCOUNT * count;
    }
    return weekendDisCount;
  }

  isSpecialDay(date) {
    let specialDayDiscount = 0;
    if (DATE.SPECIAL_DATE.includes(date))
      specialDayDiscount += -DATE.SPECIAL_DISCOUNT;
    return specialDayDiscount;
  }
}

export default Discount;
