class Stack {
  constructor() {
    this.prices = {};
  }
  push(identifier, value) {
    if (this.prices[identifier] == undefined) {
      this.prices[identifier] = [];
    }
    this.prices[identifier].push(value);
    if (this.prices[identifier].length > 20) {
      this.prices[identifier].shift();
    }
  }
}

module.exports = new Stack();
