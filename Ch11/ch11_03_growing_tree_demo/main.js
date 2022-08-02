import GrowingTree from '../../mazes/algorithms/GrowingTree.js'
import Grid from '../../mazes/Grid.js'

const h = 20
const w = 20

let grid = new Grid(h, w)
let start_at = grid.random_cell
GrowingTree.on(grid, start_at, (c => c[Math.floor(Math.random() * c.length)]))

let start = grid.middle_cell
grid.distances = start.distances

const cellSize = 20
grid.drawDistance(cellSize)

grid = new Grid(h, w)
start_at = grid.random_cell
GrowingTree.on(grid, start_at, (c => c[c.length - 1]))

start = grid.middle_cell
grid.distances = start.distances

const output2 = document.getElementById('output2')
output2.width = cellSize * w + 1
output2.height = cellSize * h + 1
const ctx2 = output2.getContext('2d')
grid.drawDistance(cellSize, ctx2)

grid = new Grid(h, w)
start_at = grid.random_cell
GrowingTree.on(grid, start_at, (c => Math.random() < 0.5 ? c[c.length - 1] : c[Math.floor(Math.random() * c.length)]))

start = grid.middle_cell
grid.distances = start.distances

const output3 = document.getElementById('output3')
output3.width = cellSize * w + 1
output3.height = cellSize * h + 1
const ctx3 = output3.getContext('2d')
grid.drawDistance(cellSize, ctx3)
