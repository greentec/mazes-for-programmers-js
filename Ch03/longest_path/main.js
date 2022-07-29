import SideWinder from '../../mazes/SideWinder.js'
import Grid from '../../mazes/Grid.js'

const grid = new Grid(8, 8)
SideWinder.on(grid)

grid.draw(30)

const start = grid.cell(0, 0)
const [new_start_id] = start.distances().max()

const new_start = grid.cell_by_id(new_start_id)
const new_distances = new_start.distances()
const [goal_id] = new_distances.max()

const goal = grid.cell_by_id(goal_id)
grid.distances = new_distances.path_to(goal)

console.log(grid.toString())
