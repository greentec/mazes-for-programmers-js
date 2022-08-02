import Grid from '../mazes/Grid.js'
import Wilsons from '../mazes/algorithms/Wilsons.js'

const grid = new Grid(20)
Wilsons.on(grid)

const cell = grid.middle_cell
grid.distances = cell.distances

grid.drawDistance()
