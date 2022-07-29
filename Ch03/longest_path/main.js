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
let new_start_id
let distance
let goal_id;
[new_start_id, distance] = distances.max()

const new_start_split = new_start_id.split('#')
const new_start = grid.get_cell(new_start_split[0], new_start_split[1])

const new_distances = new_start.distances();
[goal_id, distance] = new_distances.max()

const goal_split = goal_id.split('#')
const goal = grid.get_cell(goal_split[0], goal_split[1])
grid.distances = new_distances.path_to(goal)

console.log(grid.toString())

// let cellSize = 20;
// let output = document.getElementById('output');
// output.width = cellSize * w + 1;
// output.height = cellSize * h + 1;
// let ctx = output.getContext('2d');
// grid.to_img(cellSize);
