import WeightedGrid from '../../mazes/WeightedGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const grid = new WeightedGrid(20)
RecursiveBacktracker.on(grid)
grid.braid(1)

const start = grid.cell(0, 0)
const finish = grid.cell(grid.rows - 1, grid.columns - 1)
grid.distances = start.distances.path_to(finish)

const cellSize = 20
grid.draw(cellSize)

const cells = grid.distances.get_cells()
const [row, col] = cells[Math.floor(Math.random() * cells.length)].split('#')
const lava = grid.cell(row, col)
lava.weight = 50

grid.distances = start.distances.path_to(finish)

const output2 = document.getElementById('output2')
const ctx2 = output2.getContext('2d')
grid.draw(cellSize, ctx2)
