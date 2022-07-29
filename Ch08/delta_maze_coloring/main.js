import TriangleGrid from '../../mazes/TriangleGrid.js'
import RecursiveBacktracker from '../../mazes/RecursiveBacktracker.js'

const rows = 10
const columns = 17
const grid = new TriangleGrid(rows, columns)
const cellSize = 16
const half_width = cellSize / 2.0
const height = cellSize * Math.sqrt(3) / 2.0
const half_height = height / 2.0

const img_width = Math.floor(cellSize * (columns + 1) / 2.0) + 1
const img_height = Math.floor(height * rows) + 1

const maze = new RecursiveBacktracker()
maze.on(grid)

const start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.set_distances(start.distances())

const output = document.getElementById('output')
output.width = img_width
output.height = img_height
const ctx = output.getContext('2d')
grid.draw(cellSize)