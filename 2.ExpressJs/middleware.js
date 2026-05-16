const express = require("express");
const app = express();
//define middleware function
const myFirstMiddleWare = (req, res, next) => {
  console.log("this first middleware will run on every request");
  next();
};
app.use(myFirstMiddleWare);

app.get("/", (req, res) => {
  res.send("Welcome to our Home page");
});

app.get("/about", (req, res) => {
  res.send("Welcome to our About page");
});

// listening to port
const Port = 3000;
app.listen(Port, () => {
  console.log(`The server is running at port :  ${Port}`);
});
