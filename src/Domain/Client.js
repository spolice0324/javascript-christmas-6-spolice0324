import { INFO, MENU } from '../Util/constants';
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

}

export default Client;
