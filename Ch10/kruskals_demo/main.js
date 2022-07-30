import Kruskals from '../../mazes/Kruskals.js'
import Grid from '../../mazes/Grid.js'

const maze = new Kruskals()
const h = 20
const w = 20
const grid = new Grid(h, w)
maze.on(grid)
// grid.braid(0.5);

console.log(grid.toString())

// let start = grid.middle_cell;
// grid.distances = start.distances;

const cellSize = 10
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.draw(cellSize)
