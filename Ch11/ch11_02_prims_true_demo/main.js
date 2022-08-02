import { TruePrims } from '../../mazes/algorithms/Prims.js'
import Grid from '../../mazes/Grid.js'

const grid = new Grid(20)
const start_at = grid.random_cell
TruePrims.on(grid, start_at)

const start = grid.middle_cell
grid.distances = start.distances

grid.drawDistance()
