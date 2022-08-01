import Grid from '../../mazes/Grid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const grid = new Grid(20)
RecursiveBacktracker.on(grid)

grid.drawDistance()
