import BinaryTree from '../../mazes/BinaryTree.js'
import DistanceGrid from '../../mazes/DistanceGrid.js'

const h = 8
const w = 8
const grid = new DistanceGrid(h, w)
BinaryTree.on(grid)

console.log(grid.toString())

const start = grid.get_cell(0, 0)
const distances = start.distances()
grid.distances = distances

console.log(grid.toString())

grid.distances = distances.path_to(grid.get_cell(grid.rows - 1, 0))

console.log(grid.toString())

const cellSize = 20
grid.to_img(cellSize)
