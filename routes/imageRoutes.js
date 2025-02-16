const express = require("express");
const router = express.Router();
const generateImage = require("../utils/imageGenerator");

router.post("/api/images/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Text prompt is required." });
  }

  try {
    const imageData = await generateImage(prompt);
    return res.status(200).json(imageData); // Send the image data back to the client
  } catch (error) {
    console.error("Error in /generate-image:", error.message || error);
    return res.status(500).json({ error: "Image generation failed." });
  }
});

module.exports = router;
