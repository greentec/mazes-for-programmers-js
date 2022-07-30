import Mask from '../../mazes/Mask.js'
import MaskedGrid from '../../mazes/MaskedGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const s =
'X........X ....XX.... ...XXXX... ....XX.... X........X X........X ....XX.... ...XXXX... ....XX.... X........X'

const mask = Mask.from_txt(s)
const grid = new MaskedGrid(mask)
RecursiveBacktracker.on(grid)

console.log(grid.toString())

// let start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2));
// grid.distances = start.distances();

// let cellSize = 10;
// let output = document.getElementById('output');
// output.width = cellSize * w + 1;
// output.height = cellSize * h + 1;
// let ctx = output.getContext('2d');
// grid.draw(cellSize);
