//module.exports => export
//require => import
const firstModule = require("./first-module");
console.log(firstModule.add(10, 20));

try {
  console.log("trying to devide by zero");
  let result = firstModule.devide(10, 2);
  console.log(result);
} catch (error) {
  console.log(error.message);
}

//module wrapper
// (
//     function(exports , require , module ,__filename , __dirname){
//         //module code goes here
//     }
// )
