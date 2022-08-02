import { sample } from '../utils.js'

export default class GrowingTree {
  static on(grid, select_fn = sample, start_at = grid.random_cell) {
    let active = []
    active.push(start_at)

    while (active.length) {
      const cell = select_fn(active)
      const available_neighbors = cell.neighbors.filter(c => c.unvisited)

      if (available_neighbors.length) {
        const neighbor = sample(available_neighbors)
        cell.link(neighbor)
        active.push(neighbor)
      } else
        active = active.filter(c => c.id != cell.id)
    }
  }
}