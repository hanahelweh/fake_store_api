const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  category: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: false,
    type: String,
  },
  rating:{
    rate:{
      required: false,
      type: Number,
    },
    count:{
      required: false,
      type: Number,
    }
  }
});
module.exports = mongoose.model("product", dataSchema); //products is the folder name that appeard in MongoDB Compass application
