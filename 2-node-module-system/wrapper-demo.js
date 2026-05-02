//First
//const { greet } = require("./wrapper-explorer");
//console.log(greet('achraf'));

//Second
// const greet  = require("./wrapper-explorer").greet;
// console.log(greet('achraf'));

//Third
const wrapperExplorer = require("./wrapper-explorer");

console.log(`in wrapper demo.js file`);

console.log("__filename in wrapper Explorer", __filename);
console.log("__dirname in wrapper Explorer", __dirname);

wrapperExplorer.greet("Achraf");
