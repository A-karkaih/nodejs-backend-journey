const { error } = require("console");
const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("dataFolder Created");
}

const filePath = path.join(dataFolder, "example.txt");
//sync way of creating file

fs.writeFileSync(filePath, "Hello from node js");

console.log("File created successfully");

let readContentFromFile = fs.readFileSync(filePath, "utf8");

console.log("File content => ", readContentFromFile);

fs.appendFileSync(filePath, "\nThis is a new file content added");

readContentFromFile = fs.readFileSync(filePath, "utf8");

console.log("File after adding content => ", readContentFromFile);

//Async
const asynFilePath = path.join(dataFolder, "async-example.txt");
fs.writeFile(asynFilePath, "Hello this is async node js file", (error) => {
  if (error) {
    throw error;
  }
  console.log("Async file is created successfully");
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      throw error;
    }
    console.log("Async file data => ", data);
    fs.appendFile(
      asynFilePath,
      "\n this another line added to async file",
      (err) => {
        if (error) {
          throw error;
        }
        console.log("New File data added");

        fs.readFile(asynFilePath, "utf8", (err, updatedDAta) => {
          if (err) {
            throw err;
          }
          console.log("the added Data in async File => ", updatedDAta);
        });
      },
    );
  });
});
