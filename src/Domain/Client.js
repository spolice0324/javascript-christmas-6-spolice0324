import { DISCOUNT, INFO, MENU } from '../Util/constants';
import Discount from './Discount';

class Client {
  #date;
  #order;

  constructor(date, order) {
    this.#date = date;
    this.#order = order;
  }

  calculateBenefits() {
    const discount = new Discount();
    return discount.calculateDiscount(this.#date, this.#order);
  }

  getDate() {
    return this.#date;
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
    const isGift = this.getBeforeDiscount() >= INFO.GIFT_CONDITION;
    return (isGift && INFO.GIFT) || INFO.NONE;
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
    if (!benefit || Object.keys(benefit).length === 0) return 0;

    let totalAmount = Object.values(benefit).reduce((acc, cur) => acc + cur);
    if (this.getGift() !== INFO.NONE) totalAmount += -MENU.샴페인.price;
    return totalAmount;
  }

  getAfterDiscount() {
    const beforeDiscount = this.getBeforeDiscount();
    const discountAmount = this.getDiscountAmount();
    let gift = 0;

    if (this.getGift() !== INFO.NONE) {
      gift = MENU.샴페인.price;
    }

    const total = beforeDiscount + discountAmount + gift;
    return total;
  }

  getEventBadge() {
    const benefit = this.getDiscountAmount();

    switch (true) {
      case benefit <= -INFO.BADGE.SANTA.PRICE:
        return INFO.BADGE.SANTA.NAME;
      case benefit <= -INFO.BADGE.TREE.PRICE:
        return INFO.BADGE.TREE.NAME;
      case benefit <= -INFO.BADGE.STAR.PRICE:
        return INFO.BADGE.STAR.NAME;
      default:
        return INFO.NONE;
    }
  }
}
export default Client;
