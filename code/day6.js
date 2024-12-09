const fs = require("fs");

const findGuardPath = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const split = data.split("\n").map((x) => x.split(""));
  const maxY = split.length - 1;
  const maxX = split[0].length - 1;

  let x = 0;
  let y = 0;
  let dir = "up";

  split.forEach((line, index) => {
    const gaurdStart = line.indexOf("^");
    if (gaurdStart !== -1) {
      x = gaurdStart;
      y = index;
    }
  });

  split[y][x] = "X";
  const visited = [`${x},${y}`];

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
    if (split[y]?.[x] !== "X") {
      split[y][x] = "X";
      visited.push(`${x},${y}`);
    }
  }

  console.log(visited.length - 1);
  return visited.length - 1;
};

findGuardPath();
