# BFHL REST API

A REST API built for the Bajaj Finserv coding challenge that processes arrays and returns categorized data.

## Features

- **Data Processing**: Separates numbers (odd/even), alphabets, and special characters
- **String Manipulation**: Creates concatenated strings with alternating caps
- **Input Validation**: Handles errors gracefully
- **CORS Enabled**: Ready for frontend integration

## API Endpoints

### GET /

Health check endpoint

```json
{
  "message": "BFHL API is running",
  "status": "healthy"
}
```

### GET /bfhl

Returns operation code

```json
{
  "operation_code": 1
}
```

### POST /bfhl

Main processing endpoint

**Request:**

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**

```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/PreethCPV/Bajaj_Finserv
cd bfhl-api

# Install dependencies
npm install

# Start development server
npm run dev
```

The server will start on `http://localhost:3000`

## Deployment

This API is deployed on Render: https://bajaj-finserv-8t0s.onrender.com/

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS

## Project Structure

```
bfhl-api/
├── middleware/ # Request validation and middleware
│ └── validation.js
├── node_modules/ # Installed dependencies
├── routes/ # API route definitions
│ └── bfhl.js
├── utils/ # Utility/helper functions
│ └── dataProcessor.js
├── server.js # Main application entry point
├── test.js # Test file for API
├── package.json # Project dependencies and scripts
├── package-lock.json # Dependency lock file
├── .gitignore # Git ignore rules
```

## Author

Preetham Venkatram C - preethamvenkatram@gmail.com
