function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function devide(a, b) {
  if (b === 0) {
    throw new Error("Devide by zero is not allowed");
  }
  return a / b;
}

module.exports = { add, substract, devide };
