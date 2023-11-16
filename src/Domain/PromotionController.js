import InputView from '../View/InputView';
import OutputView from '../View/OutputView';
import Client from './Client';

class PromotionController {
  async insertInput() {
    const client = new Client(
      await InputView.readDate(),
      await InputView.readOrder(),
    );
    const date = client.getDate();
    this.printOutput(client, date);
  }

  printOutput(client, date) {
    OutputView.printIntro();
    OutputView.printPreview(date);
    OutputView.printMenuTitle(client);
    OutputView.printBeforeDiscount(client);
    OutputView.printGift(client);
    OutputView.printBenefit(client);
    OutputView.printDiscountAmount(client);
    OutputView.printAfterDiscount(client);
    OutputView.printEventBadge(client);
  }
}

export default PromotionController;
