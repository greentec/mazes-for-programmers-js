import AldousBroder from '../../mazes/algorithms/AldousBroder.js';
import ColoredGrid from '../../mazes/ColoredGrid.js';

const grid = new ColoredGrid(20)
AldousBroder.on(grid)

const start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.distances = start.distances()

grid.draw()
