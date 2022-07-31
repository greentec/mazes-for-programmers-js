import ColoredGrid from '../../mazes/ColoredGrid.js'
import Wilsons from '../../mazes/algorithms/Wilsons.js'

const grid = new ColoredGrid(20)
Wilsons.on(grid)

const cell = grid.middle_cell
grid.distances = cell.distances

grid.draw()
