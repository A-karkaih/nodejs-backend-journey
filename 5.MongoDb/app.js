const mongoose = require("mongoose");
const dns = require("node:dns/promises");

// Load environment variables
require("dotenv").config();

// Force Node to use Cloudflare and Google public DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ database connected"))
  .catch((error) => {
    console.error("❌ database error:", error.message);
    process.exit(1);
  });

//Create Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

//create user model
const User = mongoose.model("User", userSchema);
//Some Query Examples

//Create User Way 1
async function runQuery1() {
  try {
    //create a new document
    const newUser = new User({
      name: "chirok1",
      age: "26",
      isActive: false,
      tags: ["frontend", "backend"],
    });
    await newUser.save();
    console.log("create new user");
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

//Create User Way 2
async function runQuery2() {
  try {
    //create a new document
    const newUser = await User.create({
      name: "achraf",
      age: "26",
      isActive: true,
      tags: ["frontend", "backend"],
    });

    console.log("create new user", newUser);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}
//get all users
async function runQuery3() {
  try {
    const allUsers = await User.find({});
    console.log(" all users => ", allUsers);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

//get specefied user
async function runQuery4() {
  try {
    const allUsers = await User.find({ isActive: true });
    console.log("all active users  => ", allUsers);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

//get One user
async function runQuery5() {
  try {
    const getOneUser = await User.findOne({ name: "chirok1" });
    console.log("user  => ", getOneUser);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

//get selected fields
async function runQuery6() {
  try {
    const selectedFields = await User.findOne({ name: "chirok1" }).select(
      "name age -_id",
    );
    console.log("user  => ", selectedFields);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

//get limited users with skip first user
async function runQuery7() {
  try {
    const limitedUsers = await User.find().limit(2).skip(1);
    console.log("user  => ", limitedUsers);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

//sort users by field (age desc)
async function runQuery8() {
  try {
    const sortedUsers = await User.find().sort({ age: -1 });
    console.log("user  => ", sortedUsers);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

//count documents
async function runQuery9() {
  try {
    const countDocuments = await User.countDocuments({ isActive: false });
    console.log("Number of users  => ", countDocuments);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

//find and delete user
async function runQuery10() {
  try {
    const deletedUser = await User.findOneAndDelete({ name: "chirok1" });
    console.log("Deleted User  => ", deletedUser);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

//update user
async function runQuery11() {
  try {
    const getOneUser = await User.findOne({ name: "achraf karkaih" });
    const updatedUser = await User.findByIdAndUpdate(getOneUser._id, {
      $set: { age: 30 , name:'karkaih' },
      $push: { tags: "updated" },
    },{new:true});
    //{new:true} will return the updated user back
    console.log("updated User  => ", updatedUser);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}


