const fs = require("fs");

const day8 = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const lines = data
    .split("\n")
    .filter((row) => row.length > 0)
    .map((x) => x.split(""));

  const withinMatrix = ([y, x]) => lines[y] && lines[y][x];

  const antennas = {};
  const antiNodes = {};
  const antiNodesResonance = {};

  const addAntiNodes = (curr, add, level) => {
    let newNode = [curr[0] + add[0], curr[1] + add[1]];
    if (!withinMatrix(newNode)) return;
    if (level === 1) {
      if (!antiNodes[`${newNode[0]},${newNode[1]}`]) {
        antiNodes[`${newNode[0]},${newNode[1]}`] = 1;
      } else if (antiNodes[`${newNode[0]},${newNode[1]}`])
        antiNodes[`${newNode[0]},${newNode[1]}`]++;
    }
    antiNodesResonance[`${newNode[0]},${newNode[1]}`] = true;
    addAntiNodes(newNode, add, level + 1);
  };

  const getNumOfAntiNodes = async () => {
    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        const node = lines[y][x];
        if (node !== ".") {
          if (!antennas[lines[y][x]]) {
            antennas[lines[y][x]] = [[y, x]];
          } else {
            antennas[lines[y][x]].forEach((coord) => {
              let xDist = x - coord[1];
              let yDist = y - coord[0];
              addAntiNodes([y, x], [-yDist, -xDist], 0);
              addAntiNodes([coord[0], coord[1]], [yDist, xDist], 0);
            });

            antennas[lines[y][x]].push([y, x]);
          }
        }
      }
    }
    return {
      antiNodes: Object.keys(antiNodes).length,
      antiNodesResonance: Object.keys(antiNodesResonance).length,
    };
  };

  console.log(await getNumOfAntiNodes());
};

day8();
