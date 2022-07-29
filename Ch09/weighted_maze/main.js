import WeightedGrid from '../../mazes/WeightedGrid.js'
import RecursiveBacktracker from '../../mazes/RecursiveBacktracker.js'

const maze = new RecursiveBacktracker()
const h = 20
const w = 20
const grid = new WeightedGrid(h, w)
maze.on(grid)
grid.braid(1)

console.log(grid.toString())

const start = grid.cell(0, 0)
const finish = grid.cell(grid.rows - 1, grid.columns - 1)
grid.set_distances(start.distances().path_to(finish))

const cellSize = 10
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.draw(cellSize)

const cells = grid.distances.get_cells()
let row, col;
[row, col] = cells[Math.floor(Math.random() * cells.length)].split('#')
const lava = grid.cell(row, col)
lava.weight = 50

grid.set_distances(start.distances().path_to(finish))

const output2 = document.getElementById('output2')
output2.width = cellSize * w + 1
output2.height = cellSize * h + 1
const ctx2 = output2.getContext('2d')
grid.draw(cellSize, 0, ctx2)
