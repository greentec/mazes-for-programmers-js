import Mask from '../../mazes/Mask.js'
import MaskedGrid from '../../mazes/MaskedGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const mask = new Mask(10)
mask.set(0, 0, false)
mask.set(4, 4, false)
mask.set(9, 9, false)

const grid = new MaskedGrid(mask)
RecursiveBacktracker.on(grid)

// not working in MaskedGrid class
// const start = grid.middle_cell
// grid.distances = start.distances

grid.draw()
