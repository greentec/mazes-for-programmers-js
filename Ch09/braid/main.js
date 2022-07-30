import ColoredGrid from '../../mazes/ColoredGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const h = 20
const w = 20
const grid = new ColoredGrid(h, w)
RecursiveBacktracker.on(grid)
grid.braid(0.5)

console.log(grid.toString())

const start = grid.middle_cell
grid.distances = start.distances

const cellSize = 10
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.draw(cellSize)
