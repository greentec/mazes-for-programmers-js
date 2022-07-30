import ColoredGrid from '../../mazes/ColoredGrid.js'
import BinaryTree from '../../mazes/BinaryTree.js'

const grid = new ColoredGrid(25)
BinaryTree.on(grid)

const start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.distances = start.distances()

grid.draw(20)
