const fs = require("fs");

const day7 = async () => {
  const calculate = (
    values,
    target,
    operator,
    accum,
    includeConcat = false
  ) => {
    if (values.length === 0 && target === accum) return true;
    if (accum > target) return false;
    if (values.length === 0) return false;
    switch (operator) {
      case "+":
        accum = accum + values[0];
        break;
      case "*":
        accum = accum * values[0];
        break;
      case "|":
        accum = Number(`${accum}${values[0]}`);
        break;
      default:
        return false;
    }
    return (
      calculate(values.slice(1), target, "+", accum, includeConcat) ||
      calculate(values.slice(1), target, "*", accum, includeConcat) ||
      (includeConcat &&
        calculate(values.slice(1), target, "|", accum, includeConcat))
    );
  };
  const getSumOfPossibleCorrectCalibrations = async () => {
    const data = await fs.promises.readFile("data.txt", "utf8");
    const eachLine = data.split("\n");

    let correctCondensed = 0;
    let correctCondensedWithConcat = 0;

    for (let i = 0; i < eachLine.length; i++) {
      const testValueSplit = eachLine[i].split(": ");
      const testValue = parseInt(testValueSplit[0]);
      const values = testValueSplit[1].split(" ").map(Number);
      const isPossible = calculate(values, testValue, "+", 0);

      if (isPossible) {
        correctCondensed += testValue;
      }

      const isPossibleWithConcat = calculate(values, testValue, "+", 0, true);
      if (isPossibleWithConcat) {
        correctCondensedWithConcat += testValue;
      }
    }
    return { correctCondensed, correctCondensedWithConcat };
  };

  console.log(await getSumOfPossibleCorrectCalibrations());
};

day7();
