const BigNumber = require('bignumber.js');

const new_BN = (n, precision) => {
  if(precision)
    return (new BigNumber(n)).toFixed(precision);
  return new BigNumber(n);
};

const add = (n1, n2, precision) => {
  n1 = new BigNumber(n1);
  n2 = new BigNumber(n2);
  if(precision)
    return (n1.plus(n2)).toFixed(precision);
  return (n1.plus(n2)).toFixed();
};

const subtract = (n1, n2, precision) => {
  if(Number(n1) < Number(n2))
    throw new Error('Check number');
  n1 = new BigNumber(n1);
  n2 = new BigNumber(n2);
  if(precision)
    return (n1.minus(n2)).toFixed(precision);
  return (n1.minus(n2)).toFixed();
};

const multiply = (n1, n2, precision) => {
  n1 = new BigNumber(n1);
  n2 = new BigNumber(n2);
  if(precision)
    return (n1.multipliedBy(n2)).toFixed(precision);
  return (n1.multipliedBy(n2)).toFixed();
};

const divide = (n1, n2, precision) => {
  // TODO check of n2 == 0
  if(n2 === 0)
    throw new Error('Check number');
  n1 = new BigNumber(n1);
  n2 = new BigNumber(n2);
  if(precision)
    return (n1.dividedBy(n2)).toFixed(precision);
  return (n1.dividedBy(n2)).toFixed();
};

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  new_BN
};