import HexGrid from '../../mazes/HexGrid.js'
import RecursiveBacktracker from '../../mazes/RecursiveBacktracker.js'

const rows = 10
const columns = 10
const grid = new HexGrid(rows, columns)
const cellSize = 10
const a_size = cellSize / 2.0
const b_size = cellSize * Math.sqrt(3) / 2.0
const width = cellSize * 2
const height = b_size * 2

const img_width = Math.floor(3 * a_size * columns + a_size + 0.5)
const img_height = Math.floor(height * rows + b_size + 0.5)

const maze = new RecursiveBacktracker()
maze.on(grid)

const start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.distances = start.distances()

const output = document.getElementById('output')
output.width = img_width
output.height = img_height
const ctx = output.getContext('2d')
grid.draw(cellSize)