import Grid from '../../mazes/Grid.js'
import BinaryTree from '../../mazes/BinaryTree.js'
import SideWinder from '../../mazes/SideWinder.js'
import AldousBroder from '../../mazes/AldousBroder.js'
import Wilsons from '../../mazes/Wilsons.js'
import HuntAndKill from '../../mazes/HuntAndKill.js'
import RecursiveBacktracker from '../../mazes/RecursiveBacktracker.js'

const algorithms = [new BinaryTree(), new SideWinder(), new AldousBroder(), new Wilsons(), new HuntAndKill(), new RecursiveBacktracker()]
const tries = 100
const size = 20

const averages = {}

algorithms.forEach(algorithm => {
  console.log(`running ${algorithm.constructor.name}...`)

  const deadend_counts = []
  for (let i = 0; i < tries; i += 1) {
    const grid = new Grid(size, size)
    algorithm.on(grid)
    deadend_counts.push(grid.deadends().length)
  }

  const total_deadends = deadend_counts.reduce((acc, val) => acc + val)
  averages[algorithm.constructor.name] = Math.floor(total_deadends / deadend_counts.length)
})

const total_cells = size * size
console.log()
console.log(`Average dead-ends per ${size}x${size} maze (${total_cells} cells):`)
console.log()

const sorted_algorithms = algorithms.sort((a, b) => averages[b.constructor.name] - averages[a.constructor.name])

sorted_algorithms.forEach(algorithm => {
  const percentage = averages[algorithm.constructor.name] * 100.0 / (size * size)
  console.log(`${algorithm.constructor.name} : ${averages[algorithm.constructor.name]}/${total_cells} (${Math.floor(percentage)}%)`)
})

// let maze = new HuntAndKill();
// let h = 20;
// let w = 20;
// let grid = new ColoredGrid(h, w);
// maze.on(grid);

// console.log(grid.toString());

// let start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2));
// grid.set_distances(start.distances());

// let cellSize = 10;
// let output = document.getElementById('output');
// output.width = cellSize * w + 1;
// output.height = cellSize * h + 1;
// let ctx = output.getContext('2d');
// grid.to_img(cellSize);
