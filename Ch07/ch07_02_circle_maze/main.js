import PolarGrid from '../../mazes/PolarGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const rows = 8
const grid = new PolarGrid(rows)
const cellSize = 10
const img_size = 2 * rows * cellSize

RecursiveBacktracker.on(grid)

const output = document.getElementById('output')
output.width = img_size
output.height = img_size
const ctx = output.getContext('2d')
grid.draw(cellSize)