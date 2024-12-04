const fs = require("fs");

const getMultipliedDigits = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  // use regex to find all spots in data with this pattern: mul(1, 2)
  const pattern = /mul\([1-9]\d*,\s*[1-9]\d*\)/g;
  const matches = data.match(pattern);
  let total = 0;
  matches.forEach((match) => {
    const nums = match.match(/[1-9]\d*/g);
    const multiplied = nums[0] * nums[1];
    total += multiplied;
  });
  console.log(total);
  return total;
};

const getMultipliedDigitsWithDosAndDonts = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  // use regex to find all spots in data with this pattern: mul(1, 2)
  const pattern = /mul\([1-9]\d*,\s*[1-9]\d*\)|do\(\)|don't\(\)/g;
  const matches = data.match(pattern);
  let total = 0;
  let cont = true;
  matches.forEach((match) => {
    if (match === "do()") {
      cont = true;
      return;
    }
    if (match === "don't()") {
      cont = false;
      return;
    }
    if (!cont) return;
    const nums = match.match(/[1-9]\d*/g);
    const multiplied = nums[0] * nums[1];
    total += multiplied;
  });
  console.log(total);
  return total;
};

getMultipliedDigitsWithDosAndDonts();
