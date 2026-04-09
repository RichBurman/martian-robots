// Sample Input and Output as a reminder. 
// Sample Input
// 5 3
// 1 1 E
// RFRFRFRF
// 3 2 N
// FRRFLLFFRRFLL
// 0 3 W
// LLFFFLFLFL

// Sample Output
// 1 1 E

// 3 3 N LOST
// 2 3 S


// MarsGrid class to represent the grid the robot is navigating. It stores the grid boundaries, the scents left by lost robots, and the mappings for left and right turns.
class MarsGrid {
    constructor(upperX, upperY) {
        // Grid boundaries - the first line of input is the upper-right coordinates of the grid, the lower-left is assumed to be (0, 0).
        this.maxX = upperX;
        this.maxY = upperY;
        // Robot scent is left at the last grid position the robot occupied before disappearing over the edge. I will use a set to store the scents.
        this.scents = new Set();
        // Whichever way the robot is facing, leftMap and rightMap will determine the new direction the robot will face after a left or right turn.
        this.leftMap = { 'N': 'W', 'W': 'S', 'S': 'E', 'E': 'N' };
        this.rightMap = { 'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N' };
    }

    //basic movement logic for my robot. Also will need to include logic to check boundaries and check if safe to move forward due to scent.
    moveRobot(startX, startY, orientation, instructions) {
        if (startX < 0 || startX > this.maxX || startY < 0 || startY > this.maxY) {
            return `${startX} ${startY} ${orientation} LOST (OFF-GRID START)`;
        }
        let x = startX;
        let y = startY;
        let direction = orientation;

        for (let instruction of instructions) {
            if (instruction === 'L') {
                direction = this.leftMap[direction];
            } else if (instruction === 'R') {
                direction = this.rightMap[direction];
            } else if (instruction === 'F') {
                let nextX = x;
                let nextY = y;

                // x is horizontal and y is vertical.
                // Robot facing north, moving forward will increase y. 
                // Robot facing east, moving forward will increase x.
                // Robot facing south, moving forward will decrease y.
                // Robot facing west, moving forward will decrease x.

                if (direction === 'N') nextY++;
                else if (direction === 'E') nextX++;
                else if (direction === 'S') nextY--;
                else if (direction === 'W') nextX--;

                if (nextX < 0 || nextX > this.maxX || nextY < 0 || nextY > this.maxY) {
                    // last valid position and orientation before robot is lost and where the scent will be left.
                    const lostRobotScent = `${x} ${y} ${direction}`;

                    if (this.scents.has(lostRobotScent)) {
                        // if there is a scent here, a previous robot was lost here. Ignore the instruction to move forward. 
                        continue;
                    } else {
                        // if a robot is lost, mark this as a scent and return the position and orientation with LOST.
                        this.scents.add(lostRobotScent);
                        return `${x} ${y} ${direction} LOST`;
                    }
                }

                // I need to add logic to check on boundaries. 
                x = nextX;
                y = nextY;
            }
        }
        // return the robot final position and orientation. Need to check if the robot is lost and add scent if it is. 
        return `${x} ${y} ${direction}`;
    }
}

// I need a way to read the input and process multiline input string. 
// First line to set up MarsGrid, then I need to loop through the rest of lines in pairs. One line, robot starting pos, next line - robot instructions. 
// I need to make sure to use the same instance, so robots can leave scents for each other.

function runMartianRobots(input) {
    // Trim the input and split into lines.
    const lines = input.trim().split('\n').map(line => line.trim());
    if (lines.length === 0) return '';

    // First line - Grid setup.
    const [maxX, maxY] = lines[0].split(' ').map(Number);
    const missionGrid = new MarsGrid(maxX, maxY);

    const results = [];

    // Robots in pairs - one line for starting position and orientation, next line for instructions.
    for (let i = 1; i < lines.length; i += 2) {
        const positionParts = lines[i].split(' ');
        if (positionParts.length < 3) continue; // skip if not enough parts for position and orientation

        const startX = parseInt(positionParts[0]);
        const startY = parseInt(positionParts[1]);
        const orientation = positionParts[2];
        const instructions = lines[i + 1];

        const finalStatus = missionGrid.moveRobot(startX, startY, orientation, instructions);
        results.push(finalStatus);
    }
    
    return results.join('\n');
}

// Quick test to see if the moveRobot function is working. Run node mars.js to see the output.
// const testGrid = new MarsGrid(5, 3);
// console.log(testGrid.moveRobot(1, 1, 'E', 'FFF'));
// // should be a minus as the robot will move off the grid and be lost.
// console.log(testGrid.moveRobot(1, 1, 'E', 'RFF'));


// Sample Input from Developer Programming Problem
const inputData = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;



console.log('Mission Results:')
const finalOutput = runMartianRobots(inputData);
console.log(finalOutput);
console.log('---');

const expectedOutput = `1 1 E
3 3 N LOST
2 3 S`;

if (finalOutput === expectedOutput) {
    console.log('The output matches the expected output. Test passed!');
} else {
    console.log('The output does NOT match the expected output. Test failed.');
    console.log('Expected Output:');
    console.log(expectedOutput);
}

const offGridData = `5 3
10 10 E
FFFF`;

console.log('Testing Bad Start Position:');
console.log(runMartianRobots(offGridData)); 
// Expected: "Robot is LOST. Starting position is off the grid."