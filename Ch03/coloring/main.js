import ColoredGrid from '../../mazes/ColoredGrid.js'
import BinaryTree from '../../mazes/algorithms/BinaryTree.js'

const grid = new ColoredGrid(25)
BinaryTree.on(grid)

const start = grid.middle_cell
grid.distances = start.distances

grid.draw(20)
