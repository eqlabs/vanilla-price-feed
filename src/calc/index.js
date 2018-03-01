module.exports.mean = list => {
  const sum = list.reduce((a, b) => a + b);
  return sum / list.length;
};
