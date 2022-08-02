import TriangleGrid from '../mazes/TriangleGrid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const rows = 10
const columns = 17
const grid = new TriangleGrid(rows, columns)
const cellSize = 20

RecursiveBacktracker.on(grid)

const height = cellSize * Math.sqrt(3) / 2.0
const img_width = Math.floor(cellSize * (columns + 1) / 2.0) + 1
const img_height = Math.floor(height * rows) + 1

const output = document.getElementById('output')
output.width = img_width
output.height = img_height

grid.draw(cellSize)