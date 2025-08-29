// routes/bfhl.js
const express = require("express");
const router = express.Router();
const DataProcessor = require("../utils/dataProcessor");

const USER_INFO = {
  full_name: "Preetham Venkatram C",
  birth_date: "11092004",
  email: "preethamvenkatram@gmail.com",
  roll_number: "22BCE5133",
};

// GET route handler function
const getBfhl = (req, res) => {
  try {
    res.status(200).json({
      operation_code: 1,
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
};

// POST route handler function
const postBfhl = (req, res) => {
  try {
    const { data } = req.body;

    // Process the data
    const processedData = DataProcessor.processData(data);

    // Create response
    const response = {
      is_success: true,
      user_id: `${USER_INFO.full_name}_${USER_INFO.birth_date}`,
      email: USER_INFO.email,
      roll_number: USER_INFO.roll_number,
      odd_numbers: processedData.odd_numbers,
      even_numbers: processedData.even_numbers,
      alphabets: processedData.alphabets,
      special_characters: processedData.special_characters,
      sum: processedData.sum,
      concat_string: processedData.concat_string,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { getBfhl, postBfhl };
