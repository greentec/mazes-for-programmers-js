import Grid from '../../mazes/Grid.js'
import BinaryTree from '../../mazes/BinaryTree.js'

const maze = new BinaryTree()

const h = 8
const w = 8
const grid = new Grid(h, w)
maze.on(grid)

console.log(grid.toString())

const cellSize = 20
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.to_img(ctx, cellSize)
