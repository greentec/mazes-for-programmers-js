import { SimplifiedPrims } from '../../mazes/Prims.js'
import ColoredGrid from '../../mazes/ColoredGrid.js'

const maze = new SimplifiedPrims()
const h = 20
const w = 20
const grid = new ColoredGrid(h, w)
const start_at = grid.get_random_cell()
maze.on(grid, start_at)
// grid.braid(0.5);

console.log(grid.toString())

const start = grid.get_cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.set_distances(start.distances())

const cellSize = 10
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.to_img(ctx, cellSize)
