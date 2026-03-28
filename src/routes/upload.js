const express = require("express");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("photo"), async (req, res) => {
  console.log("UPLOAD HIT");
  console.log("FILE:", req.file);
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    res.json({
      imageUrl: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Upload failed");
  }
});

module.exports = router;
