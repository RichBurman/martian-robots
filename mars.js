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
    moveRobot(startX, startY. orientation, instructions) {
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

                // I need to add logic to check on boundaries. 
                x = nextX;
                y = nextY;
            }
        }
        // return the robot final position and orientation. Need to check if the robot is lost and add scent if it is. 
        return `${x} ${y} ${direction}`;
    }
}


