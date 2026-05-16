const express = require("express");
const app = express();

const requestTimesStampLogger = (req, res, next) => {
  const timeStamp = new Date().toString();
  console.log(`${timeStamp} from ${req.method} to ${req.url}`);
  next();
};

app.use(requestTimesStampLogger);


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
