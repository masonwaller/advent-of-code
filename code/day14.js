const fs = require("fs");

const day14 = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const dataSplit = data.split("\n").map((x) => x.split(" "));

  const width = 101;
  const length = 103;

  const getSafetyFactor = async () => {
    const quadrants = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    };

    for (let i = 0; i < dataSplit.length; i++) {
      let coords = dataSplit[i][0]
        .slice(2)
        .split(",")
        .map((x) => parseInt(x));
      let movement = dataSplit[i][1]
        .slice(2)
        .split(",")
        .map((x) => parseInt(x));

      let newPosX = coords[0];
      let newPosY = coords[1];

      for (let j = 0; j < 100; j++) {
        let toX = newPosX + movement[0];
        let toY = newPosY + movement[1];

        newPosX = toX < 0 ? toX + width : toX > width - 1 ? toX - width : toX;
        newPosY =
          toY < 0 ? toY + length : toY > length - 1 ? toY - length : toY;
      }

      if (newPosX < (width - 1) / 2 && newPosY < (length - 1) / 2) {
        quadrants[1]++;
      } else if (newPosX > (width - 1) / 2 && newPosY < (length - 1) / 2) {
        quadrants[2]++;
      } else if (newPosX > (width - 1) / 2 && newPosY > (length - 1) / 2) {
        quadrants[3]++;
      } else if (newPosX < (width - 1) / 2 && newPosY > (length - 1) / 2) {
        quadrants[4]++;
      }
    }

    const vals = Object.values(quadrants);
    const safetyFactor = vals.reduce((acc, val) => acc * val, 1);
    return safetyFactor;
  };

  console.log(await getSafetyFactor());
};

day14();
