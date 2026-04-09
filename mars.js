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
        // Robot scent is left at the last grid postion the robot occupied before disappearing over the edge. I will use a set to store the scents.
        this.scents = new Set();
        // Whichever way the robot is facing, leftMap and rightMap will determine the new direction the robot will face after a left or right turn.
        this.leftMap = { 'N': 'W', 'W': 'S', 'S': 'E', 'E': 'N' };
        this.rightMap = { 'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N' };
    }
}