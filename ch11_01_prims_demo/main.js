import { SimplifiedPrims } from '../../mazes/algorithms/Prims.js'
import Grid from '../../mazes/Grid.js'

const grid = new Grid(20)
SimplifiedPrims.on(grid)

grid.distances = grid.middle_cell.distances
grid.drawDistance()
