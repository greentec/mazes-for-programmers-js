import ColoredGrid from '../../mazes/ColoredGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const h = 5
const w = 5
const grid = new ColoredGrid(h, w)

let cell
cell = grid.cell(0, 0)
cell.east = null
cell.west = null
cell.south = null
cell.north = null

cell = grid.cell(4, 4)
cell.east = null
cell.west = null
cell.south = null
cell.north = null

RecursiveBacktracker.on(grid, grid.cell(1, 1))

console.log(grid.toString())

const start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.distances = start.distances

const cellSize = 10
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.draw(cellSize)
