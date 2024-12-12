const fs = require("fs");

const day10 = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const matrix = data
    .split("\n")
    .map((x) => x.split("").map((y) => parseInt(y)));

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const isInBounds = ([y, x]) => matrix[y] && matrix[y][x];

  const getTrailHeadCoords = () => {
    const trailHeadCoords = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 0) {
          trailHeadCoords.push([i, j]);
        }
      }
    }
    return trailHeadCoords;
  };

  const checkNumOfCompleteTrails = async (coords, trailEnds, onlyEnds) => {
    let numOfCompleteTrails = 0;
    for (let i = 0; i < directions.length; i++) {
      const newCoords = [
        coords[0] + directions[i][0],
        coords[1] + directions[i][1],
      ];
      if (
        isInBounds(newCoords) &&
        matrix[coords[0]][coords[1]] + 1 === matrix[newCoords[0]][newCoords[1]]
      ) {
        if (matrix[newCoords[0]][newCoords[1]] === 9) {
          if (onlyEnds) {
            if (!trailEnds[`${newCoords[0]},${newCoords[1]}`]) {
              trailEnds[`${newCoords[0]},${newCoords[1]}`] = true;
              numOfCompleteTrails++;
            }
          } else {
            numOfCompleteTrails++;
          }
        } else {
          numOfCompleteTrails += await checkNumOfCompleteTrails(
            newCoords,
            trailEnds,
            onlyEnds
          );
        }
      }
    }
    return numOfCompleteTrails;
  };

  const getSumOfTrailHeadScores = async () => {
    const trailHeadCoords = getTrailHeadCoords();
    let trailHeadScores = 0;
    let distinctRoutes = 0;

    for (let i = 0; i < trailHeadCoords.length; i++) {
      const trailEnds = {};
      const numOfCompleteTrails = await checkNumOfCompleteTrails(
        trailHeadCoords[i],
        trailEnds,
        false
      );
      const numOfCompleteTrailEnds = await checkNumOfCompleteTrails(
        trailHeadCoords[i],
        trailEnds,
        true
      );
      trailHeadScores += numOfCompleteTrailEnds;
      distinctRoutes += numOfCompleteTrails;
    }

    return {
      trailHeadScores,
      distinctRoutes,
    };
  };

  console.log(await getSumOfTrailHeadScores());
};

day10();
