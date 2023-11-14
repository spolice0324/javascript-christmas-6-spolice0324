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

  getMenuList() {
    let output = '';
    Object.entries(this.#order).forEach(([name, count]) => {
      output += `${name} ${count}${INFO.COUNT}\n`;
    });
    return output;
  }
}

export default Client;
