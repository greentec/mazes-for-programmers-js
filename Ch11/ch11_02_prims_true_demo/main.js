import { TruePrims } from '../../mazes/Prims.js'
import Grid from '../../mazes/Grid.js'

const maze = new TruePrims()
const grid = new Grid(20)
const start_at = grid.random_cell
maze.on(grid, start_at)

const start = grid.middle_cell
grid.distances = start.distances

grid.drawDistance()
