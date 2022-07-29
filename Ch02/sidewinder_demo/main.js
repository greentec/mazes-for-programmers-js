import Grid from '../../mazes/Grid.js'
import SideWinder from '../../mazes/SideWinder.js'

const h = 8
const w = 8
const grid = new Grid(h, w)
SideWinder.on(grid)

console.log(grid.toString())

const cellSize = 20
grid.to_img(cellSize)
