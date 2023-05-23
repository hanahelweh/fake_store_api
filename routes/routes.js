const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer');

// Configure multer for handling file uploads
const upload = multer({ dest: '../uploads/' });
const Model = require("../model/model");
const express = require("express");
const router = express.Router();
module.exports = router;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(upload.single('image'));
/*const corsOptions = {
  origin: "https://localhost:3000",
};
app.use(cors(corsOptions));*/

//Post Method
router.post('/post', upload.single('image'), async (req, res) => {
  console.log('Request File:', req.file);
  const data = new Model({
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    image: req.file.path,
    rating: {
      rate: req.body.rating ? req.body.rating.rate : 0,
      count: req.body.rating ? req.body.rating.count : 0,
    },
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
