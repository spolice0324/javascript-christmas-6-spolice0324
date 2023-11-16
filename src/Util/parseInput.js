const parseInput = userInput =>
  userInput
    .trim()
    .split(',')
    .map(item => {
      const [name, quantity] = item.trim().split('-');
      return [name, Number(quantity)];
    });

export default parseInput;
