import Grid from '../../mazes/Grid.js'
import BinaryTree from '../../mazes/BinaryTree.js'

const h = 8
const w = 8
const grid = new Grid(h, w)
BinaryTree.on(grid)

console.log(grid.toString())

const cellSize = 20

grid.draw(cellSize)
