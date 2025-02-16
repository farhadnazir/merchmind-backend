const axios = require("axios");

const generateImage = async (textPrompt) => {
  const options = {
    method: "POST",
    url: "https://runwayml.p.rapidapi.com/generate/text",
    headers: {
      "x-rapidapi-key": "b82549395fmsh5efa1398624638cp1f9ae5jsncc87bac45896", // Replace with your RapidAPI key
      "x-rapidapi-host": "runwayml.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      text_prompt: textPrompt, // Dynamically pass the prompt
      model: "gen3",
      width: 1344,
      height: 768,
      motion: 5,
      seed: 0,
      callback_url: "",
      time: 5,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data; // Assuming response.data contains image details
  } catch (error) {
    console.error("Error generating image:", error.message || error);
    throw error;
  }
};

module.exports = generateImage;
