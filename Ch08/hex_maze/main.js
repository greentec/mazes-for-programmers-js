import HexGrid from '../../mazes/HexGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const rows = 10
const columns = 10
const grid = new HexGrid(rows, columns)

RecursiveBacktracker.on(grid)

const cellSize = 10
grid.draw(cellSize)