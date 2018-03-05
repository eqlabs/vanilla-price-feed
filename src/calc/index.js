module.exports.sum = list => {
  return list.reduce((a, b) => a + b);
};

module.exports.mean = list => {
  const sum = list.reduce((a, b) => a + b);
  return sum / list.length;
};

module.exports.weightedAverage = list => {
  const sum = list.reduce((a, b) => a + b);
  return sum / list.length;
};
