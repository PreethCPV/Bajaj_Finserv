// test.js
const http = require("http");

const BASE_URL = "http://localhost:3000";

// Test cases from the examples
const testCases = [
  {
    name: "Example A",
    data: ["a", "1", "334", "4", "R", "$"],
    expected: {
      odd_numbers: ["1"],
      even_numbers: ["334", "4"],
      alphabets: ["A", "R"],
      special_characters: ["$"],
      sum: "339",
      concat_string: "Ra",
    },
  },
  {
    name: "Example B",
    data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"],
    expected: {
      odd_numbers: ["5"],
      even_numbers: ["2", "4", "92"],
      alphabets: ["A", "Y", "B"],
      special_characters: ["&", "-", "*"],
      sum: "103",
      concat_string: "ByA",
    },
  },
  {
    name: "Example C",
    data: ["A", "ABcD", "DOE"],
    expected: {
      odd_numbers: [],
      even_numbers: [],
      alphabets: ["A", "ABCD", "DOE"],
      special_characters: [],
      sum: "0",
      concat_string: "EoDdCbAa",
    },
  },
];

function makeRequest(data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ data });

    const options = {
      hostname: "localhost",
      port: 3000,
      path: "/bfhl",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const response = JSON.parse(body);
          resolve({ statusCode: res.statusCode, body: response });
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log("🧪 Running BFHL API Tests...\n");

  for (const testCase of testCases) {
    try {
      console.log(`Testing ${testCase.name}:`);
      console.log(`Input: ${JSON.stringify(testCase.data)}`);

      const result = await makeRequest(testCase.data);

      if (result.statusCode === 200) {
        console.log("✅ Status: 200 OK");

        // Validate specific fields
        const response = result.body;
        let allCorrect = true;

        for (const [key, expectedValue] of Object.entries(testCase.expected)) {
          if (JSON.stringify(response[key]) === JSON.stringify(expectedValue)) {
            console.log(`✅ ${key}: Correct`);
          } else {
            console.log(
              `❌ ${key}: Expected ${JSON.stringify(
                expectedValue
              )}, got ${JSON.stringify(response[key])}`
            );
            allCorrect = false;
          }
        }

        if (allCorrect) {
          console.log("🎉 Test PASSED\n");
        } else {
          console.log("❌ Test FAILED\n");
        }
      } else {
        console.log(`❌ Status: ${result.statusCode}`);
        console.log(`Response: ${JSON.stringify(result.body)}\n`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}\n`);
    }
  }
}

// Test server health first
setTimeout(() => {
  runTests().catch(console.error);
}, 1000);

console.log("Please make sure the server is running on port 3000");
console.log("Run: npm run dev");
