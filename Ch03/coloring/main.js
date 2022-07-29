import BinaryTree from '../../mazes/BinaryTree.js'
import ColoredGrid from '../../mazes/ColoredGrid.js'

const grid = new ColoredGrid(25)
BinaryTree.on(grid)

const start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.set_distances(start.distances())

grid.draw(20)
