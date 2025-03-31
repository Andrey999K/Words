export const roundNumber = (num: number, decimalPlaces: number = 2) => {
  const multiplier = Math.pow(10, decimalPlaces);
  const roundedNum = Math.round((num + Number.EPSILON) * multiplier) / multiplier;
  return roundedNum.toFixed(decimalPlaces);
};