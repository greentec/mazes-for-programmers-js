import Grid from '../mazes/Grid.js'
import SideWinder from '../mazes/algorithms/SideWinder.js'

const h = 8
const w = 8
const grid = new Grid(h, w)
SideWinder.on(grid)

console.log(grid.toString())

const cellSize = 20
grid.draw(cellSize)
