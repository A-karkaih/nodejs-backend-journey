const lodash = require('lodash');

const names = ['achraf' , 'chirok' , 'mohamed' , 'alex' , 'jhon'];

const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalize);
