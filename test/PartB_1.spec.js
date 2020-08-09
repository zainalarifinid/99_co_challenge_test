
const ProcessArray = require('../PartB_1');

describe('Part B Number 1, should sum node level from node, if it\'s contain searched character', () => {
  it('should return 0 if given doesnt exist searched character', () => {
    const processArray = new ProcessArray();
    const node = [ '' ];
    const keyword = 'X';
    expect(processArray.sum_deep(node, keyword)).toBe(0);
  });

  it('should return 1 if given exist searched character on level 1', () => {
    const processArray = new ProcessArray();
    const node = [ 'X' ];
    const keyword = 'X';
    expect(processArray.sum_deep(node, keyword)).toBe(1);
  })

  it('should return 2 if given exist searcged charcter on level 2', () => {
    const processArray = new ProcessArray();
    const node = [ 'X', [ 'Y' ] ];
    const keyword = 'Y';
    expect(processArray.sum_deep(node, keyword)).toBe(2);
  });

  it('should return 4 if given 2 searched character on level 2', () => {
    const processArray = new ProcessArray();
    const node = ['AB', [ 'XY' ], [ 'YP' ]];
    const keyword = 'Y';
    expect(processArray.sum_deep(node, keyword)).toBe(4);
  });

  it('should return 7 if given 7 searched character in different level', () => {
    const processArray = new ProcessArray();
    const node = ['X', ['', ['', ['Y'], ['X']]], ['X', ['', ['Y'], ['Z']]]];
    const keyword = 'X';
    expect(processArray.sum_deep(node, keyword)).toBe(7);
  });

  it('should return 7 if given 7 searched character in different level', () => {
    const processArray = new ProcessArray();
    const node = ['X', [''], ['X'], ['X'], ['Y', ['']], ['X']];
    const keyword = 'X';
    expect(processArray.sum_deep(node, keyword)).toBe(7);
  });

});
