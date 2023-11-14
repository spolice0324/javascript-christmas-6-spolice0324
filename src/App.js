import PromotionController from './Domain/PromotionController';

class App {
  constructor() {
    this.promotionController = new PromotionController();
  }

  async run() {
    await this.promotionController.insertInput();
  }
}

export default App;
