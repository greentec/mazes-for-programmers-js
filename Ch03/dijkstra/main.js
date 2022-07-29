import BinaryTree from '../../mazes/BinaryTree.js'
import DistanceGrid from '../../mazes/DistanceGrid.js'

const grid = new DistanceGrid(8, 8)
BinaryTree.on(grid)

console.log(grid.toString())

const start = grid.cell(0, 0)
const distances = start.distances()

grid.distances = distances
console.log(grid.toString())

grid.distances = distances.path_to(grid.cell(grid.rows - 1, 0))
console.log(grid.toString())

grid.to_img()
