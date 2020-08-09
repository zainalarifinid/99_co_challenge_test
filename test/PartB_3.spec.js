

const Combination = require('../PartB_3');

describe('Part B Number 3, should return biggest delta between the biggest combination number and smallest combination', () => {
  it('should return 198, if given combination array [1, 2, 3]', () => {
    const combination = new Combination();
    const listCombination = [1, 2, 3];
    expect(combination.longest(listCombination)).toBe(198);
  });

  it('should return 9999, if given combination array [1, 10, 100]', () => {
    const combination = new Combination();
    const listCombination = [1, 10, 100];
    expect(combination.longest(listCombination)).toBe(9999);
  });

  it('should return 87218703, if given combination array [100, 97, 23, 1]', () => {
    const combination = new Combination();
    const listCombination = [100, 97, 23, 1];
    expect(combination.longest(listCombination)).toBe(87218703);
  });

  it('should return 8003878569, if given combination array [9041, 376, 5, 10]', () => {
    const combination = new Combination();
    const listCombination = [9041, 376, 5, 10];
    expect(combination.longest(listCombination)).toBe(8003878569);
  });
});
