import { DISCOUNT, INFO, MENU } from '../Util/constants';
import Discount from './Discount';

class Client {
  #date;
  #order;

  constructor(date, order) {
    this.#date = date;
    this.#order = order;
  }

  getDate() {
    return this.#date;
  }

  calculateBenefits() {
    const discount = new Discount();
    return discount.calculateDiscount(this.#date, this.#order);
  }

  getOrderList() {
    let output = '';
    Object.entries(this.#order).forEach(([name, count]) => {
      output += `${name} ${count}${INFO.COUNT}\n`;
    });
    return output;
  }

  getBeforeDiscount() {
    let cost = 0;
    Object.entries(this.#order).forEach(([name, count]) => {
      cost += MENU[name].price * count;
    });
    return cost;
  }

  getGift() {
    if (this.getBeforeDiscount() >= INFO.GIFT_CONDITION) return INFO.GIFT;
    else return INFO.NONE;
  }

  getBenefitList() {
    const benefit = this.calculateBenefits();
    if (!benefit || Object.keys(benefit).length === 0) {
      return INFO.NONE;
    }
    let output = '';
    Object.entries(benefit).forEach(([discount, cost]) => {
      output += `${discount}: ${cost.toLocaleString()}${INFO.UNIT}\n`;
    });
    if (this.getGift() !== INFO.NONE)
      output += `${DISCOUNT.GIFTS}: -${MENU.샴페인.price.toLocaleString()}${
        INFO.UNIT
      }\n`;
    return output;
  }

  getDiscountAmount() {
    const benefit = this.calculateBenefits();
    if (this.isEmpty(benefit)) return 0;

    let totalAmount = Object.values(benefit).reduce((acc, cur) => acc + cur);
    if (this.getGift() !== INFO.NONE) totalAmount += -MENU.샴페인.price;
    return totalAmount;
  }
}

export default Client;
