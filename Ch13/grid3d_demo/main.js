import RecursiveBacktracker from '../../mazes/RecursiveBacktracker.js'
import Grid3D from '../../mazes/Grid3D.js'

const maze = new RecursiveBacktracker()
const level = 3
const h = 3
const w = 3
const grid = new Grid3D(level, h, w)
maze.on(grid)
// grid.braid(0.5);

// console.log(grid.toString());

// let start = grid.get_cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2));
// grid.set_distances(start.distances());

const cellSize = 40
const margin = cellSize / 2
const grid_width = cellSize * grid.columns
const grid_height = cellSize * grid.rows

const img_width = grid_width * grid.levels + (grid.levels - 1) * margin
const img_height = grid_height

const output = document.getElementById('output')
output.width = img_width + 1
output.height = img_height + 1
const ctx = output.getContext('2d')
grid.to_img(cellSize)
