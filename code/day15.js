const fs = require("fs");

const day15 = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const dataSplit = data.split("\n\n");
  const matrix = dataSplit[0].split("\n").map((x) => x.split(""));
  const instructions = dataSplit[1].split("").filter((x) => x !== "\n");

  const robotStartRow = matrix.findIndex((row) => row.includes("@"));

  const robotPos = { y: robotStartRow, x: matrix[robotStartRow].indexOf("@") };

  const moveRobot = async (instruction) => {
    let movementEnd = [robotPos.y, robotPos.x];
    let order = [];
    while (
      matrix[movementEnd[0]][movementEnd[1]] !== "." &&
      matrix[movementEnd[0]][movementEnd[1]] !== "#"
    ) {
      order.push(matrix[movementEnd[0]][movementEnd[1]]);

      if (instruction === "^") {
        movementEnd[0]--;
      } else if (instruction === "v") {
        movementEnd[0]++;
      } else if (instruction === "<") {
        movementEnd[1]--;
      } else if (instruction === ">") {
        movementEnd[1]++;
      }
    }
    if (matrix[movementEnd[0]][movementEnd[1]] === ".") {
      console.log(movementEnd, matrix[movementEnd[0]][movementEnd[1]], order);
      while (movementEnd[0] !== robotPos.y || movementEnd[1] !== robotPos.x) {
        matrix[movementEnd[0]][movementEnd[1]] = order.pop();
        if (instruction === "^") {
          movementEnd[0]++;
        } else if (instruction === "v") {
          movementEnd[0]--;
        } else if (instruction === "<") {
          movementEnd[1]++;
        } else if (instruction === ">") {
          movementEnd[1]--;
        }
      }
      matrix[robotPos.y][robotPos.x] = ".";
      if (instruction === "^") {
        robotPos.y--;
      } else if (instruction === "v") {
        robotPos.y++;
      } else if (instruction === "<") {
        robotPos.x--;
      } else if (instruction === ">") {
        robotPos.x++;
      }
    } else if (matrix[movementEnd[0]][movementEnd[1]] === "#") {
      return;
    }
  };

  const moveRobotThroughInstructions = async () => {
    instructions.forEach((instruction, idx) => {
      moveRobot(instruction);
    });
  };

  const calculateSumOfGPSCoords = async () => {
    await moveRobotThroughInstructions();
    let sum = 0;

    matrix.forEach((row, idx) => {
      row.forEach((cell, i) => {
        if (cell === "O") {
          sum += idx * 100 + i;
        }
      });
    });
    return sum;
  };

  console.log(await calculateSumOfGPSCoords());
};

day15();
