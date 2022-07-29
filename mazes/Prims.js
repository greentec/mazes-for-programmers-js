export class SimplifiedPrims {
  on(grid, start_at = grid.get_random_cell()) {
    let active = []
    active.push(start_at)

    while (active.length > 0) {
      const cell = active[Math.floor(Math.random() * active.length)]
      const available_neighbors = cell.neighbors().filter(c => c.get_links().length == 0)

      if (available_neighbors.length > 0) {
        const neighbor = available_neighbors[Math.floor(Math.random() * available_neighbors.length)]
        cell.link(neighbor)
        active.push(neighbor)
      } else
        active = active.filter(c => c.id != cell.id)
    }
  }
}

export class TruePrims {
  on(grid, start_at = grid.get_random_cell()) {
    let active = []
    active.push(start_at)
    const costs = {}
    const cell_gen = grid.each_cell()

    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break
      costs[cell.id] = Math.floor(Math.random() * 100)
    }

    while (active.length > 0) {
      active.sort((a, b) => costs[a.id] - costs[b.id])
      const cell = active[0]
      const available_neighbors = cell.neighbors().filter(c => c.get_links().length == 0)
      if (available_neighbors.length > 0) {
        available_neighbors.sort((a, b) => costs[a.id] - costs[b.id])
        const neighbor = available_neighbors[0]
        cell.link(neighbor)
        active.push(neighbor)
      } else
        active = active.filter(c => c.id != cell.id)
    }
  }
}