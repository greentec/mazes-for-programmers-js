import Grid from '../../mazes/Grid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const grid = new Grid(20)
RecursiveBacktracker.on(grid)

const cellSize = 20
grid.draw(cellSize, 0.1)

