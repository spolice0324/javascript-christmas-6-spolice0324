describe('View 테스트', () => {
  describe('InputView 테스트', () => {
    test('readDate 함수 테스트', () => {
      const mockDate = 25;
      const mockReadDate = jest.fn(() => mockDate);
      const mockInputView = {
        readDate: mockReadDate,
      };

      const date = mockInputView.readDate();

      expect(date).toBe(mockDate);
      expect(mockReadDate).toBeCalledTimes(1);
    });
  });

  describe('OutputView 테스트', () => {
    test('printIntro 함수 테스트', () => {
      const mockPrintIntro = jest.fn();
      const mockOutputView = {
        printIntro: mockPrintIntro,
      };

      mockOutputView.printIntro();

      expect(mockPrintIntro).toBeCalledTimes(1);
    });

    test('printPreview 함수 테스트', () => {
      const mockDate = 25;
      const mockPrintPreview = jest.fn();
      const mockOutputView = {
        printPreview: mockPrintPreview,
      };

      mockOutputView.printPreview(mockDate);

      expect(mockPrintPreview).toBeCalledTimes(1);
      expect(mockPrintPreview).toBeCalledWith(mockDate);
    });
  });
});
