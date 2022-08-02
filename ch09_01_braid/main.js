import Grid from '../mazes/Grid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const grid = new Grid(20)
RecursiveBacktracker.on(grid)
grid.braid(0.5) // remove deadends

const start = grid.middle_cell
grid.distances = start.distances

grid.drawDistance(20)
