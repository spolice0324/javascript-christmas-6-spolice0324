import Client from '../src/Domain/Client';
import PromotionController from '../src/Domain/PromotionController';
import InputView from '../src/View/InputView';
import OutputView from '../src/View/OutputView';

jest.mock('../src/View/InputView', () => ({
  readDate: jest.fn(),
  readOrder: jest.fn(),
}));

jest.mock('../src/View/OutputView', () => ({
  printIntro: jest.fn(),
  printPreview: jest.fn(),
  printMenuTitle: jest.fn(),
  printBeforeDiscount: jest.fn(),
  printGift: jest.fn(),
  printBenefit: jest.fn(),
  printDiscountAmount: jest.fn(),
  printAfterDiscount: jest.fn(),
  printEventBadge: jest.fn(),
}));

jest.mock('../src/Domain/Client', () =>
  jest.fn().mockImplementation(() => ({
    getDate: jest.fn(),
  })),
);

describe('PromotionController 테스트', () => {
  let promotionController;

  beforeEach(() => {
    jest.clearAllMocks();
    promotionController = new PromotionController();
  });

  describe('인풋 입력', () => {
    test('올바른 입력값으로 Client 인스턴스를 생성한다.', async () => {
      InputView.readDate.mockResolvedValue(25);
      InputView.readOrder.mockResolvedValue({ 스테이크: 2, 아이스크림: 3 });
      const mockClientInstance = {
        getDate: jest.fn(),
      };
      Client.mockImplementation(() => mockClientInstance);
      mockClientInstance.getDate.mockReturnValue(25);

      await promotionController.insertInput();

      expect(InputView.readDate).toHaveBeenCalled();
      expect(InputView.readOrder).toHaveBeenCalled();
      expect(Client).toHaveBeenCalledWith(25, { 스테이크: 2, 아이스크림: 3 });
      expect(mockClientInstance.getDate).toHaveBeenCalled();
      expect(OutputView.printIntro).toHaveBeenCalled();
      expect(OutputView.printPreview).toHaveBeenCalledWith(25);
      expect(OutputView.printMenuTitle).toHaveBeenCalledWith(
        mockClientInstance,
      );
    });
  });

  describe('아웃풋 출력', () => {
    it('올바른 Client 인스턴스를 전달받으면, 정상적으로 출력을 수행한다.', () => {
      const mockClientInstance = {
        getDate: jest.fn(),
      };
      promotionController.printOutput(mockClientInstance, 25);

      expect(OutputView.printIntro).toHaveBeenCalled();
      expect(OutputView.printPreview).toHaveBeenCalledWith(25);
      expect(OutputView.printMenuTitle).toHaveBeenCalledWith(
        mockClientInstance,
      );
    });
  });
});
