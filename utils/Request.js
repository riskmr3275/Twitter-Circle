const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
exports.makeRequest = async (url, params = {}) => {
  try {
    // Ensure the full URL is correctly formed with the BASE_URL from environment variables
    const fullUrl = `${process.env.BASE_URL}${url}`;

    // Send GET request to the Twitter API
    const response = await axios.get(fullUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        'Accept': 'application/json',
      },
      params,
    });
    // Return the response data
    return response.data;
  } catch (error) {
    // Error handling: log the error and throw it for further handling
    console.error("Request error:", error.response?.data || error.message);

    // Throw the error for handling in the calling function
    throw error;
  }
};
