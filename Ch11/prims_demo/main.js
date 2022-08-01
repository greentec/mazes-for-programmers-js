import { SimplifiedPrims } from '../../mazes/Prims.js'
import Grid from '../../mazes/Grid.js'

const maze = new SimplifiedPrims()
const h = 20
const w = 20
const grid = new Grid(h, w)
const start_at = grid.random_cell
maze.on(grid, start_at)
// grid.braid(0.5);

console.log(grid.toString())

const start = grid.middle_cell
grid.distances = start.distances

const cellSize = 10
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.drawDistance(cellSize)
