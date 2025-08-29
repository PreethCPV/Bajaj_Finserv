// utils/dataProcessor.js

class DataProcessor {
  static processData(data) {
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

      // Check if it's a number
      if (this.isNumber(str)) {
        const num = parseInt(str);
        result.sum += num;

        if (num % 2 === 0) {
          result.even_numbers.push(str);
        } else {
          result.odd_numbers.push(str);
        }
      }
      // Check if it contains only alphabetic characters
      else if (this.isAlphabet(str)) {
        result.alphabets.push(str.toUpperCase());
        // Collect individual characters for concat_string
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
    result.concat_string = this.createConcatString(alphabetChars);
    result.sum = result.sum.toString();

    return result;
  }

  static isNumber(str) {
    return /^\d+$/.test(str) && !isNaN(parseInt(str));
  }

  static isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
  }

  static createConcatString(alphabetChars) {
    // Reverse the array and apply alternating caps
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
}

module.exports = DataProcessor;
