import AldousBroder from '../../mazes/algorithms/AldousBroder.js';
import ColoredGrid from '../../mazes/ColoredGrid.js';

const grid = new ColoredGrid(20)
AldousBroder.on(grid)

const start = grid.middle_cell
grid.distances = start.distances

grid.draw()
