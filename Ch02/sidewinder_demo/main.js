import Grid from '../../mazes/Grid.js'
import SideWinder from '../../mazes/SideWinder.js'

const maze = new SideWinder()

const h = 8
const w = 8
const grid = new Grid(h, w)
maze.on(grid)

console.log(grid.toString())

const cellSize = 20
grid.to_img(cellSize)
