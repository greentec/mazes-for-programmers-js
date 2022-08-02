import { sample } from '../utils.js'

export class SimplifiedPrims {
  static on(grid, start_at = grid.random_cell) {
    let active = []
    active.push(start_at)

    while (active.length) {
      const cell = sample(active)
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

export class TruePrims {
  static on(grid, start_at = grid.random_cell) {
    let active = []
    active.push(start_at)
    const costs = {}

    for (const cell of grid.each_cell())
      costs[cell.id] = Math.floor(Math.random() * 100)

    while (active.length) {
      active.sort((a, b) => costs[a.id] - costs[b.id])
      const cell = active[0]
      const available_neighbors = cell.neighbors.filter(c => c.unvisited)
      if (available_neighbors.length) {
        available_neighbors.sort((a, b) => costs[a.id] - costs[b.id])
        const neighbor = available_neighbors[0]
        cell.link(neighbor)
        active.push(neighbor)
      } else
        active = active.filter(c => c.id != cell.id)
    }
  }
}