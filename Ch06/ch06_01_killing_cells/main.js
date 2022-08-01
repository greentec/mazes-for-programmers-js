import Grid from '../../mazes/Grid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const grid = new Grid(10)

let cell
cell = grid.cell(0, 0) // top left
cell.east = null
cell.west = null
cell.south = null
cell.north = null

cell = grid.cell(grid.rows - 1, grid.columns - 1) // bottom right
cell.east = null
cell.west = null
cell.south = null
cell.north = null

RecursiveBacktracker.on(grid, grid.cell(1, 1))

grid.drawDistance()
