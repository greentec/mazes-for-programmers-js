import { TruePrims } from '../../mazes/algorithms/Prims.js'
import Grid from '../../mazes/Grid.js'

const grid = new Grid(20)
TruePrims.on(grid)

grid.distances = grid.middle_cell.distances
grid.drawDistance()
