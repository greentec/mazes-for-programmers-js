import WeaveGrid from '../../mazes/WeaveGrid.js'
import RecursiveBacktracker from '../../mazes/RecursiveBacktracker.js'

const maze = new RecursiveBacktracker()
const h = 20
const w = 20
const grid = new WeaveGrid(h, w)
maze.on(grid)

console.log(grid.toString())

// let start = grid.get_cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2));
// grid.set_distances(start.distances());

const cellSize = 20
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.to_img(cellSize, 0.1)
