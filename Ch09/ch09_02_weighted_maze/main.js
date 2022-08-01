import WeightedGrid from '../../mazes/WeightedGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const grid = new WeightedGrid(20)
RecursiveBacktracker.on(grid)
grid.braid(1) // no braid no weight

const { first_cell, last_cell } = grid
grid.distances = first_cell.distances.path_to(last_cell)

const cellSize = 20
grid.draw(cellSize)

const { random_id } = grid.distances
const lava_cell = grid.cell_by_id(random_id)
lava_cell.weight = 50

grid.distances = first_cell.distances.path_to(last_cell)

const output2 = document.getElementById('output2')
const ctx2 = output2.getContext('2d')
grid.draw(cellSize, ctx2)
