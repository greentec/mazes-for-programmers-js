import BinaryTree from '../../mazes/BinaryTree.js'
import ColoredGrid from '../../mazes/ColoredGrid.js'

const maze = new BinaryTree()
// let maze = new SideWinder();
const h = 25
const w = 25
const grid = new ColoredGrid(h, w)
maze.on(grid)

console.log(grid.toString())

const start = grid.get_cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.set_distances(start.distances())

const cellSize = 10
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.to_img(ctx, cellSize)

