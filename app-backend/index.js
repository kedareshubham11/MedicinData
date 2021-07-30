const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const medicineapi = require("./routes/medicineapi");
const upload = require("express-fileupload");
const app = express();

dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongo");
  }
);

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("common"));
app.use(upload());

// app.get("/", (req, res) => {
//   res.send("welcome to homepage");
// });

app.use("/api/", medicineapi);

app.get("/", (req, res) => {
  res.send("backend Server is Running....");
});

app.listen(8000, () => {
  console.log("backend server is running.....");
});
