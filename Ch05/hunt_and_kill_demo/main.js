import ColoredGrid from '../../mazes/ColoredGrid.js'
import HuntAndKill from '../../mazes/algorithms/HuntAndKill.js'

const grid = new ColoredGrid(20)
HuntAndKill.on(grid)

console.log(grid.toString())

const start = grid.middle_cell
grid.distances = start.distances

grid.draw()
