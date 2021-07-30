const router = require("express").Router();
const medicineSchema = require("../models/MedicineSchema");
const csvtojson = require("csvtojson");

router.get("/", (req, res) => {
  res.send("in medicine data");
});

router.post("/uploadCSV", async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file upload" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/cleint/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });

  try {
    await csvtojson()
      .fromFile(`${__dirname}/cleint/public/uploads/${file.name}`)
      .then((csvdata) => {
        medicineSchema.insertMany(csvdata, (err, response) => {
          console.log(`Inserted: rows`);
        });
      });
  } catch (err) {
    console.log(err);
  }

  res
    .status(200)
    .json({ fileName: file.name, filepath: `/upload/${file.name} ` });
});

router.post("/deleteAll", async (req, res) => {
  try {
    await medicineSchema.deleteMany();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "error" });
  }
  return res.status(200).json({ msg: "Deleted All" });
});

router.get("/getAllMedicine", async (req, res) => {
  let data;
  try {
    data = await medicineSchema.find();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "error" });
  }

  return res.status(200).json(data);
});

router.post("/searchMedicine", async (req, res) => {
  let data;
  try {
    const c_name = req.body.c_name;
    data = await medicineSchema.find({ c_name });
    // data = await medicineSchema.find({ $text: { $search: c_name } });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "error" });
  }

  return res.status(200).json(data);
});

module.exports = router;
