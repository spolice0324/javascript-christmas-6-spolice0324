import { DATE } from '../Util/constants';

class Discount {
  checkPeriod(date) {
    let periodDiscount = 0;
    if (date >= DATE.EVNET_START && date <= DATE.EVENT_END) {
      periodDiscount +=
        -DATE.PERIOD_DISCOUNT + (date - 1) * -DATE.PER_DAY_DISCOUNT;
    }
    return periodDiscount;
  }
}

export default Discount;
