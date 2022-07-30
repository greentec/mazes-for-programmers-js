export default class RecursiveBacktracker {
  static on(grid, start_at = grid.random_cell()) {
    const stack = [start_at]

    while (stack.length > 0) {
      const current = stack[stack.length - 1]
      const neighbors = current.neighbors.filter(cell => cell.links_length == 0)
      if (neighbors.length == 0)
        stack.pop()
      else {
        const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
        current.link(neighbor)
        stack.push(neighbor)
      }
    }
  }
}