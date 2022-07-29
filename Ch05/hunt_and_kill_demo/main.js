import ColoredGrid from '../../mazes/ColoredGrid.js'
import HuntAndKill from '../../mazes/HuntAndKill.js'

const maze = new HuntAndKill()
const h = 20
const w = 20
const grid = new ColoredGrid(h, w)
maze.on(grid)

console.log(grid.toString())

const start = grid.get_cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.set_distances(start.distances())

const cellSize = 10
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.to_img(cellSize)
