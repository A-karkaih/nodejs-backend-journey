const { rejects } = require("node:assert");
const { resolve } = require("node:dns");

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

console.log("Promise lecture starts");
delay(2000)
  .then(() => {
    return "after 2s promise resolved";
  })
  .then((data) => {
    console.log(data);
  });
console.log("end");

function devideFn(num1, num2) {
  return new Promise((resolve, rejects) => {
    if (num2 === 0) {
      rejects("can not perform deevision by zero");
    } else {
      resolve(num1 / num2);
    }
  });
}

devideFn(10, 0)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
