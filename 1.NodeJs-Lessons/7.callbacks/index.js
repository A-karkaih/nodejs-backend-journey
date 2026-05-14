const { error } = require("console");
const fs = require("fs");

function person(name, callbackFn) {
  console.log("Hello: " + name);
  callbackFn();
}

function address() {
  console.log("Morocco");
}

person("Achraf karkaih", address);

fs.readFile("input.txt", "utf8", (error, data) => {
  if (error) {
    console.log("Error reading file: ", err);
    return;
  }
  console.log(data);
  
});
