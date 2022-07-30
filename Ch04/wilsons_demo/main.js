import ColoredGrid from '../../mazes/ColoredGrid.js'
import Wilsons from '../../mazes/algorithms/Wilsons.js'

const grid = new ColoredGrid(20)
Wilsons.on(grid)

const start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))
grid.distances = start.distances

grid.draw()
