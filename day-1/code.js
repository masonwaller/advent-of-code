const axios = require("axios");

const getData = async () => {
  const response = await axios.get("https://adventofcode.com/2024/day/1/input");
  return response.data;
};

console.log(getData());
