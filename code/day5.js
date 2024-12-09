const fs = require("fs");

const addMiddleOfCorrectUpdates = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const split = data.split("\n");
  const separator = split.findIndex((x) => x === "");
  const rules = split.slice(0, separator);
  const updates = split.slice(separator + 1);
  const rulesObj = {};
  rules.forEach((rule) => {
    const split = rule.split("|");
    if (rulesObj[split[0]]) {
      rulesObj[split[0]].push(split[1]);
      return;
    }
    rulesObj[split[0]] = [split[1]];
  });
  let incorrectLists = [];
  let correctMiddlesAdded = 0;
  for (let i = 0; i < updates.length; i++) {
    const split = updates[i].split(",");
    let incorrect = false;
    for (let j = 0; j < split.length; j++) {
      if (rulesObj[split[j]]) {
        const thisSection = split.slice(0, j);
        const isIncorrect = thisSection.findIndex((x) =>
          rulesObj[split[j]].includes(x)
        );
        if (isIncorrect !== -1) {
          incorrect = true;
          incorrectLists.push(split);
          break;
        }
      }
    }
    if (!incorrect) {
      const middle = parseInt(split[Math.floor(split.length / 2)]);
      correctMiddlesAdded += middle;
    }
  }

  let addedMiddlesOfIncorrectLists = 0;

  for (let i = 0; i < incorrectLists.length; i++) {
    let correctlySorted = incorrectLists[i].sort((a, b) => {
      if (rulesObj[a]?.includes(b)) return -1;
      if (rulesObj[b]?.includes(a)) return 1;
      return 0;
    });
    const middle = parseInt(
      correctlySorted[Math.floor(correctlySorted.length / 2)]
    );
    addedMiddlesOfIncorrectLists += middle;
  }

  console.log(correctMiddlesAdded, addedMiddlesOfIncorrectLists);
  return correctMiddlesAdded;
};

addMiddleOfCorrectUpdates();
