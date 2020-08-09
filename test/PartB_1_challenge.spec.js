
const ProcessString = require('../PartB_1_challenge');

describe('Part B Number 1 Challenge, should sum node level from node, if it\'s contain searched character and multiplied by position character', () => {
  it('should return 37 if given string with position in every level', () => {
    const processString = new ProcessString();
    const node = [ 'ABAH', ['CIRCA'], ['CRUMP', ['IRA']], ['ALI'] ];
    const keyword = 'ACI';
    expect(processString.sumDeepString(node, keyword)).toBe(37);
  });
});
