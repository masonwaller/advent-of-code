const fs = require("fs");

const day13 = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const dataSplit = data.split("\n\n").map((x) => x.split("\n"));

  const findRoute = (currCoords, coins, aAdd, bAdd, prizeCoords) => {
    // i do not know how to solve this as it is too slow but I believe that this works with smaller numbers
    if (currCoords[0] === prizeCoords[0] && currCoords[1] === prizeCoords[1]) {
      return coins;
    }

    let resultOfA;
    let resultOfB;

    if (
      currCoords[0] + aAdd[0] <= prizeCoords[0] &&
      currCoords[1] + aAdd[1] <= prizeCoords[1]
    ) {
      resultOfA = findRoute(
        [currCoords[0] + aAdd[0], currCoords[1] + aAdd[1]],
        coins + 3,
        aAdd,
        bAdd,
        prizeCoords
      );
    }
    if (
      currCoords[0] + bAdd[0] <= prizeCoords[0] &&
      currCoords[1] + bAdd[1] <= prizeCoords[1]
    ) {
      resultOfB = findRoute(
        [currCoords[0] + bAdd[0], currCoords[1] + bAdd[1]],
        coins + 1,
        aAdd,
        bAdd,
        prizeCoords
      );
    }

    if (resultOfA < resultOfB) {
      return resultOfA;
    } else if (resultOfA > resultOfB) {
      return resultOfB;
    } else {
      return undefined;
    }
  };

  let coinsNeeded = 0;

  for (let i = 0; i < 1; i++) {
    const numsA = dataSplit[i][0]
      .split("Button A: X+")[1]
      .split(", Y+")
      .map((x) => parseInt(x));
    const numsB = dataSplit[i][1]
      .split("Button B: X+")[1]
      .split(", Y+")
      .map((x) => parseInt(x));
    const prizeCoords = dataSplit[i][2]
      .split("Prize: X=")[1]
      .split(", Y=")
      .map((x) => parseInt(x));
    const coins = await findRoute([0, 0], 0, numsA, numsB, prizeCoords);
    coinsNeeded += coins;
  }

  console.log(coinsNeeded);
};

day13();
