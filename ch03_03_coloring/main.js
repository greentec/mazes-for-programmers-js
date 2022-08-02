import Grid from '../mazes/Grid.js'
import BinaryTree from '../mazes/algorithms/BinaryTree.js'

const grid = new Grid(25)
BinaryTree.on(grid)

const start = grid.middle_cell
grid.distances = start.distances

grid.drawDistance(20)
