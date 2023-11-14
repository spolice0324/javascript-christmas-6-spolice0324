import { DATE, DISCOUNT, INFO, MENU, MENU_KIND } from '../Util/constants';

class Discount {
  calculateDiscount(date, menu) {
    const discount = {};
    const checkDisCount = (key, value) => {
      if (value !== 0) discount[key] = value;
    };

    checkDisCount(DISCOUNT.CHRISTMAS, this.checkPeriod(date));
    checkDisCount(DISCOUNT.WEEK, this.checkWeek(date, menu));
    checkDisCount(DISCOUNT.WEEKEND, this.checkWeekend(date, menu));
    checkDisCount(DISCOUNT.SPECIAL, this.checkSpecialDay(date));
    return discount;
  }

  checkPeriod(date) {
    let periodDiscount = 0;
    if (date >= DATE.EVENT_START && date <= DATE.EVENT_END) {
      periodDiscount +=
        -DATE.PERIOD_DISCOUNT + (date - 1) * -DATE.PER_DAY_DISCOUNT;
    }
    return periodDiscount;
  }

  checkWeek(date, menu) {
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

  checkWeekend(date, menu) {
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

  checkSpecialDay(date) {
    let specialDayDiscount = 0;
    if (DATE.SPECIAL_DATE.includes(date))
      specialDayDiscount += -DATE.SPECIAL_DISCOUNT;
    return specialDayDiscount;
  }
}

export default Discount;
