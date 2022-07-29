import GrowingTree from '../../mazes/GrowingTree.js'
import ColoredGrid from '../../mazes/ColoredGrid.js'

const maze = new GrowingTree()
const h = 20
const w = 20
let grid
let start_at
let start
grid = new ColoredGrid(h, w)
start_at = grid.random_cell()
maze.on(grid, start_at, (c => c[Math.floor(Math.random() * c.length)]))

console.log(grid.toString())

start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.set_distances(start.distances())

const cellSize = 10
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.draw(cellSize)

grid = new ColoredGrid(h, w)
start_at = grid.random_cell()
maze.on(grid, start_at, (c => c[c.length - 1]))

console.log(grid.toString())

start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.set_distances(start.distances())

const output2 = document.getElementById('output2')
output2.width = cellSize * w + 1
output2.height = cellSize * h + 1
const ctx2 = output2.getContext('2d')
grid.draw(cellSize, 0, ctx2)

grid = new ColoredGrid(h, w)
start_at = grid.random_cell()
maze.on(grid, start_at, (c => Math.random() < 0.5 ? c[c.length - 1] : c[Math.floor(Math.random() * c.length)]))

console.log(grid.toString())

start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.set_distances(start.distances())

const output3 = document.getElementById('output3')
output3.width = cellSize * w + 1
output3.height = cellSize * h + 1
const ctx3 = output3.getContext('2d')
grid.draw(cellSize, 0, ctx3)
