const fs = require("fs");

const seperateLists = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const list = data.split("\n");
  const list1 = [];
  const list2 = [];
  list.forEach((element) => {
    const split = element.split(" ");
    const x = split[0];
    const y = split[split.length - 1];
    list1.push(parseInt(x));
    list2.push(parseInt(y));
  });
  return { list1, list2 };
};

const getDistanceBetweenPoints = (x, y) => {
  const dist = x - y;
  return dist < 0 ? dist * -1 : dist;
};

const getDistance = async () => {
  const { list1, list2 } = await seperateLists();
  const list1Sorted = list1.sort((a, b) => a - b);
  const list2Sorted = list2.sort((a, b) => a - b);
  let distance = 0;
  for (let i = 0; i < list1Sorted.length; i++) {
    const newDist = getDistanceBetweenPoints(list1Sorted[i], list2Sorted[i]);
    distance += newDist;
  }
  console.log(distance, "asdfasfd");
  return distance;
};

getDistance();
