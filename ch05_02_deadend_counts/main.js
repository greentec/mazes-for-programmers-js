import Grid from '../mazes/Grid.js'
import BinaryTree from '../mazes/algorithms/BinaryTree.js'
import SideWinder from '../mazes/algorithms/SideWinder.js'
import AldousBroder from '../mazes/algorithms/AldousBroder.js'
import Wilsons from '../mazes/algorithms/Wilsons.js'
import HuntAndKill from '../mazes/algorithms/HuntAndKill.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const algorithms = [BinaryTree, SideWinder, AldousBroder, Wilsons, HuntAndKill, RecursiveBacktracker]
const tries = 100
const size = 20

const averages = {}

algorithms.forEach(algorithm => {
  console.log(`running ${algorithm.name}...`)

  const deadend_counts = []
  for (let i = 0; i < tries; i += 1) {
    const grid = new Grid(size, size)
    algorithm.on(grid)
    deadend_counts.push(grid.deadends.length)
  }

  const total_deadends = deadend_counts.reduce((acc, val) => acc + val)
  averages[algorithm.name] = Math.floor(total_deadends / deadend_counts.length)
})

const total_cells = size * size
console.log()
console.log(`Average dead-ends per ${size}x${size} maze (${total_cells} cells):`)
console.log()

const sorted_algorithms = algorithms.sort((a, b) => averages[b.name] - averages[a.name])

sorted_algorithms.forEach(algorithm => {
  const percentage = averages[algorithm.name] * 100.0 / (size * size)
  console.log(`${algorithm.name} : ${averages[algorithm.name]}/${total_cells} (${Math.floor(percentage)}%)`)
})
