// server.js - Complete working version
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const USER_INFO = {
  full_name: "Preetham Venkatram C",
  birth_date: "11092004",
  email: "preethamvenkatram@gmail.com",
  roll_number: "22BCE5133",
};

app.use(cors());
app.use(express.json({ limit: "10mb" }));

function isNumber(str) {
  return /^\d+$/.test(str) && !isNaN(parseInt(str));
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function createConcatString(alphabetChars) {
  const reversed = alphabetChars.reverse();
  let result = "";

  for (let i = 0; i < reversed.length; i++) {
    if (i % 2 === 0) {
      result += reversed[i].toLowerCase();
    } else {
      result += reversed[i].toUpperCase();
    }
  }

  return result;
}

function processData(data) {
  const result = {
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: 0,
    concat_string: "",
  };

  const alphabetChars = [];

  data.forEach((item) => {
    const str = String(item);
    if (isNumber(str)) {
      const num = parseInt(str);
      result.sum += num;

      if (num % 2 === 0) {
        result.even_numbers.push(str);
      } else {
        result.odd_numbers.push(str);
      }
    } else if (isAlphabet(str)) {
      result.alphabets.push(str.toUpperCase());
      for (let char of str) {
        alphabetChars.push(char.toLowerCase());
      }
    }
    // Otherwise it's a special character
    else {
      result.special_characters.push(str);
    }
  });

  // Create concatenated string with alternating caps in reverse order
  result.concat_string = createConcatString(alphabetChars);
  result.sum = result.sum.toString();

  return result;
}

// ===== ROUTES =====

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "BFHL API is running",
    status: "healthy",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "GET /",
      bfhl_get: "GET /bfhl",
      bfhl_post: "POST /bfhl",
    },
  });
});

// GET /bfhl route - Returns operation code
app.get("/bfhl", (req, res) => {
  try {
    console.log("📥 GET /bfhl request received");
    res.status(200).json({
      operation_code: 1,
    });
  } catch (error) {
    console.error("❌ GET /bfhl error:", error);
    res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
});

// POST /bfhl route - Main functionality
app.post("/bfhl", (req, res) => {
  try {
    console.log("📥 POST /bfhl request received");
    console.log("📋 Request body:", req.body);

    const { data } = req.body;

    // Input validation
    if (!data) {
      console.log("❌ Validation failed: Missing data field");
      return res.status(400).json({
        is_success: false,
        message: "Missing 'data' field in request body",
      });
    }

    if (!Array.isArray(data)) {
      console.log("❌ Validation failed: Data is not an array");
      return res.status(400).json({
        is_success: false,
        message: "'data' must be an array",
      });
    }

    if (data.length === 0) {
      console.log("❌ Validation failed: Empty data array");
      return res.status(400).json({
        is_success: false,
        message: "'data' array cannot be empty",
      });
    }

    console.log("✅ Input validation passed");

    // Process the data
    const processedData = processData(data);
    console.log("🔄 Data processed:", processedData);

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

    console.log("✅ Response prepared, sending...");
    res.status(200).json(response);
  } catch (error) {
    console.error("❌ POST /bfhl error:", error);
    res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
});

// 404 handler for undefined routes
app.use("*", (req, res) => {
  console.log(`❌ 404: ${req.method} ${req.path}`);
  res.status(404).json({
    is_success: false,
    message: `Endpoint ${req.method} ${req.path} not found`,
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("💥 Unhandled error:", error);
  res.status(500).json({
    is_success: false,
    message: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log("\n🚀 BFHL API Server Started Successfully!");
  console.log("=========================================");
  console.log(`📍 Local URL: http://localhost:${PORT}`);
  console.log(`🔗 API Endpoint: http://localhost:${PORT}/bfhl`);
  console.log(`👤 User ID: ${USER_INFO.full_name}_${USER_INFO.birth_date}`);
  console.log(`📧 Email: ${USER_INFO.email}`);
  console.log(`🎓 Roll Number: ${USER_INFO.roll_number}`);
  console.log("=========================================");
  console.log("🧪 Ready for testing!");
  console.log("\nQuick test commands:");
  console.log("curl http://localhost:3000/");
  console.log("curl http://localhost:3000/bfhl");
  console.log(
    'curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d \'{"data": ["a","1","2"]}\''
  );
  console.log("");
});

module.exports = app;
