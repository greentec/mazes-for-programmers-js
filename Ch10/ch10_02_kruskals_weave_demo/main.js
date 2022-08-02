import Kruskals, { State } from '../../mazes/algorithms/Kruskals.js'
import { PreconfiguredGrid } from '../../mazes/WeaveGrid.js'

const h = 20
const w = 20
const grid = new PreconfiguredGrid(h, w)
const state = new State(grid)

for (let i = 0; i < grid.size; i += 1) {
  const row = 1 + Math.floor(Math.random() * (grid.rows - 2))
  const column = 1 + Math.floor(Math.random() * (grid.columns - 2))
  state.add_crossing(grid.cell(row, column))
}

// console.log(grid)

Kruskals.on(grid, state)
// grid.braid(0.5);

console.log(grid.toString())

// let start = grid.middle_cell;
// grid.distances = start.distances;

const cellSize = 30
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.draw(cellSize, 0.2)
