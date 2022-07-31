import ColoredGrid from '../../mazes/ColoredGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const grid = new ColoredGrid(20)
RecursiveBacktracker.on(grid)

grid.draw()
