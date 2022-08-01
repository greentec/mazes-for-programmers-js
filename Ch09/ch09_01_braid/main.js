import ColoredGrid from '../../mazes/ColoredGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const grid = new ColoredGrid(20)
RecursiveBacktracker.on(grid)
grid.braid(0.5)

const start = grid.middle_cell
grid.distances = start.distances

grid.draw(20)
