import Mask from '../../mazes/Mask.js'
import MaskedGrid from '../../mazes/MaskedGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const s =
'X........X ....XX.... ...XXXX... ....XX.... X........X X........X ....XX.... ...XXXX... ....XX.... X........X'

const mask = Mask.from_txt(s)
const grid = new MaskedGrid(mask)
RecursiveBacktracker.on(grid)

// let start = grid.middle_cell;
// grid.distances = start.distances;

grid.draw()
