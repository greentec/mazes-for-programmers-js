import ColoredGrid from '../../mazes/ColoredGrid.js'
import HuntAndKill from '../../mazes/HuntAndKill.js'

const h = 20
const w = 20
const grid = new ColoredGrid(h, w)
HuntAndKill.on(grid)

console.log(grid.toString())

const start = grid.middle_cell
grid.distances = start.distances

const cellSize = 10
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.draw(cellSize)
