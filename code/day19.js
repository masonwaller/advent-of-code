const fs = require("fs");

const day19 = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const dataSplit = data.split("\n\n");
  const towelPatterns = dataSplit[1].split("\n");

  const patterns = {};
  dataSplit[0].split(", ").forEach((pattern) => (patterns[pattern] = true));

  checkPossible = async (pattern, strStart, strEnd) => {
    console.log(pattern, pattern.length, strStart, strEnd);
    while (strStart < strEnd) {
      if (strEnd >= pattern.length - 1) {
        return false;
      }
      let subPattern = pattern.slice(strStart, strEnd);
      //   console.log(subPattern);
      if (patterns[subPattern]) {
        if (strEnd === pattern.length - 1) {
          return true;
        }
        let result = await checkPossible(pattern, strEnd, strEnd + 1);
        if (result) {
          return true;
        }
      } else {
        strEnd++;
      }
    }
  };

  const getPossibleTowelPatterns = async () => {
    let possible = 0;
    for (let i = 0; i < 1; i++) {
      let pattern = towelPatterns[i];
      let result = await checkPossible(pattern, 0, 1);
      if (result) {
        possible++;
      }
    }
    return possible;
  };

  console.log(await getPossibleTowelPatterns());
};

day19();
