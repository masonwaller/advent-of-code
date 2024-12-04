const fs = require("fs");

const checkXMAS = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const list = data.split("\n").map((x) => parseInt(x));
  for (let i = 25; i < list.length; i++) {
    let found = false;
    for (let j = i - 25; j < i; j++) {
      for (let k = i - 25; k < i; k++) {
        if (list[j] + list[k] === list[i]) {
          found = true;
        }
      }
    }
    if (!found) {
      console.log(list[i]);
      return list[i];
    }
  }
};
