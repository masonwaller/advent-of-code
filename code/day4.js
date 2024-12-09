const fs = require("fs");

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

const directions2 = [
  [
    [1, 1],
    [-1, -1],
  ],
  [
    [1, -1],
    [-1, 1],
  ],
];

const word = "XMAS";

const checkXMAS = async () => {
  const data = await fs.promises.readFile("data.txt", "utf8");
  const list = data.split("\n").map((x) => x.split(""));
  let valid = 0;
  let validPart2 = 0;

  const charAt = (i, j) => (list[i] && list[i][j] ? list[i][j] : "");

  const checkForWord = (y, x) => {
    if (!(list[y] || list[y][x])) return 0;
    if (list[y][x] !== word[0]) return 0;

    return directions
      .map(([dx, dy]) => {
        return (
          charAt(y, x) +
          charAt(y + dy, x + dx) +
          charAt(y + dy * 2, x + dx * 2) +
          charAt(y + dy * 3, x + dx * 3)
        );
      })
      .filter((x) => x === word).length;
  };

  const checkForX_M_A_S = (y, x) => {
    if (!(list[y] || list[y][x])) return 0;
    if (list[y][x] !== word[2]) return 0;

    return directions2
      .map(([dir1, dir2]) => {
        return (
          charAt(y + dir1[0], x + dir1[1]) +
          charAt(y, x) +
          charAt(y + dir2[0], x + dir2[1])
        );
      })
      .filter((x) => x === "MAS" || x === "SAM").length === 2
      ? 1
      : 0;
  };

  for (let y = 0; y < list.length; y++) {
    for (let x = 0; x < list[y].length; x++) {
      valid += checkForWord(y, x);
      validPart2 += checkForX_M_A_S(y, x);
    }
  }
  console.log(valid, validPart2);
  return valid;
};

checkXMAS();
