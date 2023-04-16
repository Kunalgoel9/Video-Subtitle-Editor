const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();
var cors = require("cors");

app.use(cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = `uploads/${file.originalname.split(".")[0]}`;
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "video", maxCount: 1 },
  { name: "subtitle", maxCount: 1 },
]);

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Upload failed");
    } else {
      console.log("Upload successful");
      res.send("Upload successful");
    }
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
