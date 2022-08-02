import GrowingTree from '../../mazes/algorithms/GrowingTree.js'
import Grid from '../../mazes/Grid.js'
import { sample } from '../../mazes/utils.js'

const last = arr => arr[arr.length - 1]

let grid = new Grid(20)
GrowingTree.on(grid, sample)

const cellSize = 20
grid.drawDistance(cellSize)

grid = new Grid(20)
GrowingTree.on(grid, last)

const output2 = document.getElementById('output2')
const ctx2 = output2.getContext('2d')
grid.drawDistance(cellSize, ctx2)

grid = new Grid(20)
GrowingTree.on(grid, arr => Math.random() < 0.5 ? last(arr) : sample(arr))

const output3 = document.getElementById('output3')
const ctx3 = output3.getContext('2d')
grid.drawDistance(cellSize, ctx3)
