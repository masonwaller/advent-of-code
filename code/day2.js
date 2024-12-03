const fs = require("fs");

const checkNumberOfSafeLists = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const list = data.split("\n");
  let safeLists = list.length;
  for (let i = 0; i < list.length; i++) {
    const split = list[i].split(" ");
    const numbered = split.map((x) => parseInt(x));
    let direction = numbered[0] > numbered[1] ? "decreasing" : "increasing";
    for (let j = 0; j < numbered.length - 1; j++) {
      if (numbered[j] > numbered[j + 1] && direction === "increasing") {
        safeLists--;
        break;
      } else if (numbered[j] < numbered[j + 1] && direction === "decreasing") {
        safeLists--;
        break;
      } else if (
        Math.abs(numbered[j] - numbered[j + 1]) > 3 ||
        Math.abs(numbered[j] - numbered[j + 1]) === 0
      ) {
        safeLists--;
        break;
      }
    }
  }
  console.log(safeLists);
  return safeLists;
};

const checkErrors = (numbered) => {
  let direction = numbered[0] > numbered[1] ? "decreasing" : "increasing";
  for (let j = 0; j < numbered.length - 1; j++) {
    if (numbered[j] > numbered[j + 1] && direction === "increasing") {
      return true;
    } else if (numbered[j] < numbered[j + 1] && direction === "decreasing") {
      return true;
    } else if (
      Math.abs(numbered[j] - numbered[j + 1]) > 3 ||
      Math.abs(numbered[j] - numbered[j + 1]) === 0
    ) {
      return true;
    }
  }
};

const checkNumberOfSafeListsWithDampener = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const list = data.split("\n");
  let safeLists = list.length;
  for (let i = 0; i < list.length; i++) {
    const split = list[i].split(" ");
    const numbered = split.map((x) => parseInt(x));
    let remove = checkErrors(numbered);
    if (remove) {
      const newListsToCheck = numbered.map((x, index) => {
        return numbered.filter((y, yIndex) => yIndex !== index);
      });
      let canBeSafe = false;
      for (let k = 0; k < newListsToCheck.length; k++) {
        let remove = checkErrors(newListsToCheck[k]);
        if (!remove) {
          canBeSafe = true;
          break;
        }
      }
      if (!canBeSafe) {
        safeLists--;
      }
    }
  }
  console.log(safeLists);
  return safeLists;
};

checkNumberOfSafeListsWithDampener();
