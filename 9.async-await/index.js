const { resolve } = require("node:dns");

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function delayGreet(name) {
  await delay(2000);
  console.log(name);
}

delayGreet("achraf");

async function devision(num1, num2) {
  try {
    if (num2 === 0) {
      throw new Error("Can't do devision by 0");
    }
    return num1 / num2;
  } catch (error) {
    console.error("error", error);
  }
}

async function mainFn() {
  console.log(await devision(10, 2));
  console.log(await devision(10, 0));
}

mainFn();


