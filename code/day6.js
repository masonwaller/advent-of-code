const fs = require("fs");

const findGuardPath = async (split) => {
  const maxY = split.length - 1;
  const maxX = split[0].length - 1;

  let x = 0;
  let y = 0;
  let dir = "up";
  let exitReason = "end";

  split.forEach((line, index) => {
    const gaurdStart = line.indexOf("^");
    if (gaurdStart !== -1) {
      x = gaurdStart;
      y = index;
    }
  });

  split[y][x] = "X";
  const visited = new Set();
  visited.add(`${dir},${x},${y}`);

  while (0 <= x && x <= maxX && 0 <= y && y <= maxY) {
    if (dir === "up") {
      if (split[y - 1]?.[x] !== "#") {
        y--;
      } else {
        dir = "right";
      }
    } else if (dir === "right") {
      if (split[y]?.[x + 1] !== "#") {
        x++;
      } else {
        dir = "down";
      }
    } else if (dir === "down") {
      if (split[y + 1]?.[x] !== "#") {
        y++;
      } else {
        dir = "left";
      }
    } else if (dir === "left") {
      if (split[y]?.[x - 1] !== "#") {
        x--;
      } else {
        dir = "up";
      }
    }
    if (visited.has(`${dir},${x},${y}`)) {
      exitReason = "loop";
      break;
    } else if (split[y]?.[x] && split[y][x] !== "X") {
      split[y][x] = "X";
      visited.add(`${dir},${x},${y}`);
    }
  }
  return { visited, exitReason };
};

const copy = (matrix) => matrix.map((row) => row.map((char) => char));

const findLoops = async (matrix, guardFloorPlan) => {
  let infiniteLoops = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (
        matrix[y][x] !== "#" &&
        matrix[y][x] !== "^" &&
        guardFloorPlan[y][x] !== "."
      ) {
        let matrix2 = copy(matrix);
        matrix2[y][x] = "#";
        const { visited, exitReason } = await findGuardPath(matrix2);
        if (exitReason === "loop") {
          infiniteLoops++;
        }
      }
    }
  }
  return infiniteLoops;
};

const day6 = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const split = data.split("\n").map((x) => x.split(""));
  const guardFloorPlan = copy(split);
  const { visited, exitReason } = await findGuardPath(guardFloorPlan);
  const loops = await findLoops(copy(split), guardFloorPlan);

  console.log(visited.size, loops);
  return visited.size;
};

day6();
