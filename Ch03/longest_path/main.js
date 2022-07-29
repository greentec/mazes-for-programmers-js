import SideWinder from '../../mazes/SideWinder.js'
import DistanceGrid from '../../mazes/DistanceGrid.js'

const grid = new DistanceGrid(8, 8)
SideWinder.on(grid)

console.log(grid.to_img(30))

const start = grid.cell(0, 0)
const distances = start.distances()
const [new_start_id] = distances.max()

const new_start_coord = new_start_id.split('#')
const new_start = grid.cell(new_start_coord[0], new_start_coord[1])

const new_distances = new_start.distances()
const [goal_id] = new_distances.max()

const goal_coord = goal_id.split('#').map(Number)
const goal = grid.cell(goal_coord[0], goal_coord[1])
grid.distances = new_distances.path_to(goal)

console.log(grid.toString())
