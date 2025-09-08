const express = require("express");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("video"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post(
      "http://localhost:8000/analyze-video", // Python service
      formData,
      { headers: formData.getHeaders() }
    );

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    // Save result to DB if needed
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "ML Service failed" });
  }
});

module.exports = router;
