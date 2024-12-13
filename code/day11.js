const fs = require("fs");

const day11 = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const stones = data.split(" ").map((x) => parseInt(x));

  const cache = new Map();

  const blink = (num, blinks) => {
    let cacheKey = `${num},${blinks}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    let result;
    if (blinks === 0) {
      result = 1;
    } else if (num === 0) {
      result = blink(1, blinks - 1);
    } else if (!(num.toString().length % 2)) {
      let strNum = num.toString();
      result =
        blink(parseInt(strNum.slice(0, strNum.length / 2)), blinks - 1) +
        blink(parseInt(strNum.slice(strNum.length / 2)), blinks - 1);
    } else {
      result = blink(num * 2024, blinks - 1);
    }
    cache.set(cacheKey, result);
    return result;
  };

  const getNumOfStones = async () => {
    const stonesAfter25Blinks = stones.reduce(
      (acc, stone) => acc + blink(stone, 25),
      0
    );
    const stonesAfter75Blinks = stones.reduce(
      (acc, stone) => acc + blink(stone, 75),
      0
    );

    return { stonesAfter25Blinks, stonesAfter75Blinks };
  };

  console.log(await getNumOfStones());
};

day11();
