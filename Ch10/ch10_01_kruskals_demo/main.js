import Kruskals from '../../mazes/algorithms/Kruskals.js'
import Grid from '../../mazes/Grid.js'

const grid = new Grid(20)
Kruskals.on(grid)

grid.draw()
