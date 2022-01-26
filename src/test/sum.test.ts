import sum from './sum';

describe('sum', () => {
  it('should add two numbers', () => {
    expect.assertions(1);
    return expect(sum(10, 10)).toEqual(20);
  });
});