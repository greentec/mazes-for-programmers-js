import Kruskals, { State } from './Kruskals.js'
import { PreconfiguredGrid } from './WeaveGrid.js'

const h = 20
const w = 20
const grid = new PreconfiguredGrid(h, w)
const state = new State(grid)

for (let i = 0; i < grid.size(); i += 1) {
  const row = 1 + Math.floor(Math.random() * (grid.rows - 2))
  const column = 1 + Math.floor(Math.random() * (grid.columns - 2))
  state.add_crossing(grid.get_cell(row, column))
}

Kruskals.on(grid, state)
// grid.braid(0.5)

// const start = grid.get_cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
// grid.set_distances(start.distances())

const cellSize = 30
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.to_img(ctx, cellSize, 0.2)
