import AldousBroder from '../mazes/algorithms/AldousBroder.js';
import Grid from '../mazes/Grid.js';

const grid = new Grid(20)
AldousBroder.on(grid)

const start = grid.middle_cell
grid.distances = start.distances

grid.drawDistance()
