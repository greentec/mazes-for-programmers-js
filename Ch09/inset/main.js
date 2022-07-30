import Grid from '../../mazes/Grid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const h = 20
const w = 20
const grid = new Grid(h, w)
RecursiveBacktracker.on(grid)

console.log(grid.toString())

// let start = grid.middle_cell;
// grid.distances = start.distances;

const cellSize = 20
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.draw(cellSize, 0.1)

