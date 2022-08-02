import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'
import Grid3D from '../../mazes/Grid3D.js'

const level = 3
const h = 5
const w = 5
const grid = new Grid3D(level, h, w)
RecursiveBacktracker.on(grid)

const output = document.getElementById('output')
output.width = 800
output.height = 600
grid.draw(40)
