// middleware/validation.js

const validateBFHLRequest = (req, res, next) => {
  try {
    const { data } = req.body;

    // Check if data exists
    if (!data) {
      return res.status(400).json({
        is_success: false,
        message: "Missing 'data' field in request body",
      });
    }

    // Check if data is an array
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "'data' must be an array",
      });
    }

    // Check if array is not empty
    if (data.length === 0) {
      return res.status(400).json({
        is_success: false,
        message: "'data' array cannot be empty",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid JSON format",
    });
  }
};

module.exports = { validateBFHLRequest };
