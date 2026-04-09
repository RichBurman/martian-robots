class MarsGrid {
  constructor(upperX, upperY) {
    this.maxX = Math.min(upperX, 50); // Max value is 50.
    this.maxY = Math.min(upperY, 50); // Max value is 50.

    this.scents = new Set();

    this.leftMap = { N: "W", W: "S", S: "E", E: "N" };
    this.rightMap = { N: "E", E: "S", S: "W", W: "N" };
  }

  moveRobot(startX, startY, orientation, instructions) {
    if (instructions.length >= 100) {
      return "Error: Instruction string too long (max 99 characters).";
    }
    if (startX < 0 || startX > this.maxX || startY < 0 || startY > this.maxY) {
      return `${startX} ${startY} ${orientation} LOST (OFF-GRID START)`;
    }
    let x = startX;
    let y = startY;
    let direction = orientation;

    for (let instruction of instructions) {
      if (instruction === "L") {
        direction = this.leftMap[direction];
      } else if (instruction === "R") {
        direction = this.rightMap[direction];
      } else if (instruction === "F") {
        let nextX = x;
        let nextY = y;

        if (direction === "N") nextY++;
        else if (direction === "E") nextX++;
        else if (direction === "S") nextY--;
        else if (direction === "W") nextX--;
        // More command types can be added here if needed in the future.

        if (nextX < 0 || nextX > this.maxX || nextY < 0 || nextY > this.maxY) {
          const lostRobotScent = `${x} ${y} ${direction}`;

          if (this.scents.has(lostRobotScent)) {
            continue;
          } else {
            this.scents.add(lostRobotScent);
            return `${x} ${y} ${direction} LOST`;
          }
        }

        x = nextX;
        y = nextY;
      }
    }

    return `${x} ${y} ${direction}`;
  }
}

function runMartianRobots(input) {
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.trim());
  if (lines.length === 0) return "";

  const [maxX, maxY] = lines[0].split(" ").map(Number);
  const missionGrid = new MarsGrid(maxX, maxY);

  const results = [];

  for (let i = 1; i < lines.length; i += 2) {
    const positionParts = lines[i].split(" ");
    if (positionParts.length < 3) continue;

    const startX = parseInt(positionParts[0]);
    const startY = parseInt(positionParts[1]);
    const orientation = positionParts[2];
    const instructions = lines[i + 1];

    const finalStatus = missionGrid.moveRobot(
      startX,
      startY,
      orientation,
      instructions,
    );
    results.push(finalStatus);
  }

  return results.join("\n");
}

// Unit Tests to validate the Martian Robots problem.
function runTests() {
  const inputData = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

  console.log("Running Martian Robot function with sample input:");
  const finalOutput = runMartianRobots(inputData);
  console.log(finalOutput);
  console.log("---");

  // Test 1 - Sample Input from the problem statement to see if we get the expected output.
  // Sample Input from Developer Programming Problem

  const expectedOutput = `1 1 E
3 3 N LOST
2 3 S`;

  console.log("Test 1 - Sample Input:");
  //   const finalOutput = runMartianRobots(inputData);

  if (finalOutput === expectedOutput) {
    console.log("The output matches the expected output. Test passed!");
  } else {
    console.log("The output does NOT match the expected output. Test failed.");
    console.log("Expected Output:");
    console.log(expectedOutput);
  }

  console.log("---");

  // Test 2 - Off-Grid Robot Start Position

  console.log("Test 2 - Off-Grid Robot Start Position:");
  const offGridData = `5 3
10 10 E
FFFF`;

  const offGridResult = runMartianRobots(offGridData);

  if (offGridResult.includes("LOST (OFF-GRID START)")) {
    console.log("Off-grid start position correctly identified. Test passed!");
  } else {
    console.log(
      "Off-grid start position not correctly identified. Test failed.",
    );
  }

  console.log("---");

  // Test 3 - Instruction String more than 99 characters

  console.log("Test 3 - Instruction String more than 99 characters:");
  const longInstructions = "F".repeat(100); // 100 characters long
  const lengthTestData = `5 3
1 1 E
${longInstructions}`;

  const lengthResult = runMartianRobots(lengthTestData);

  if (lengthResult.includes("Error: Instruction string too long")) {
    console.log("Instruction length correctly identified. Test passed!");
  } else {
    console.log("Instruction length not correctly identified. Test failed.");
  }

  console.log("---");
  console.log("All tests completed.");
}

runTests();
