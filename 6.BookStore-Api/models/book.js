const mongoose = require("mongoose");

const { type } = require("node:os");
const { title } = require("node:process");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      MaxLength: [100, "Book title can not be more than 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Publication year is required"],
      min: [1000, "Year must be atleast 1000"],
      max: [new Date().getFullYear, "Year can not be in the future"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Book', bookSchema);
