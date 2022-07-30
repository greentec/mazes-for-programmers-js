import Mask from '../../mazes/Mask.js'
import MaskedGrid from '../../mazes/MaskedGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const h = 10
const w = 10

const mask = new Mask(h, w)
mask.set(0, 0, false)
mask.set(4, 4, false)
mask.set(9, 9, false)

const grid = new MaskedGrid(mask)
RecursiveBacktracker.on(grid)

// not working in this class
// const start = grid.middle_cell
// grid.distances = start.distances

grid.draw()
