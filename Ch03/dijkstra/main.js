import BinaryTree from '../../mazes/BinaryTree.js'
import SideWinder from '../../mazes/SideWinder.js'
import DistanceGrid from '../../mazes/DistanceGrid.js'

// var maze = new BinaryTree();
const maze = new SideWinder()
const h = 8
const w = 8
const grid = new DistanceGrid(h, w)
maze.on(grid)

console.log(grid.toString())

const start = grid.get_cell(0, 0)
const distances = start.distances()
grid.distances = distances

console.log(grid.toString())

grid.distances = distances.path_to(grid.get_cell(grid.rows - 1, 0))

console.log(grid.toString())

// let cellSize = 20;
// let output = document.getElementById('output');
// output.width = cellSize * w + 1;
// output.height = cellSize * h + 1;
// let ctx = output.getContext('2d');
// grid.to_img(ctx, cellSize);

