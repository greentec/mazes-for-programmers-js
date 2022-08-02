import Grid from '../../mazes/Grid.js'
import RecursiveDivision from '../../mazes/algorithms/RecursiveDivision.js'

const grid = new Grid(20)
RecursiveDivision.on(grid)

console.log(grid.toString())

grid.draw()
