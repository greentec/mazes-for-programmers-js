import Mask from '../../mazes/Mask.js'
import MaskedGrid from '../../mazes/MaskedGrid.js'
import RecursiveBacktracker from '../../mazes/RecursiveBacktracker.js'

const maze = new RecursiveBacktracker()
const h = 5
const w = 5

const mask = new Mask(h, w)
mask.set_bits(0, 0, false)
mask.set_bits(2, 2, false)
mask.set_bits(4, 4, false)

const grid = new MaskedGrid(mask)
maze.on(grid)

console.log(grid.toString())

// let start = grid.get_cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2));
// grid.set_distances(start.distances());

// let cellSize = 10;
// let output = document.getElementById('output');
// output.width = cellSize * w + 1;
// output.height = cellSize * h + 1;
// let ctx = output.getContext('2d');
// grid.to_img(cellSize);
