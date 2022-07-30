const sample = arr => arr[Math.floor(Math.random() * arr.length)]

export default class HuntAndKill {
  static on(grid) {
    let current = grid.random_cell

    while (current) {
      const unvisited_neighbors = current.neighbors.filter(cell => !cell.links_length)
      let neighbor
      let visited_neighbors

      if (unvisited_neighbors.length) {
        neighbor = sample(unvisited_neighbors)
        current.link(neighbor)
        current = neighbor
      } else {
        current = null
        for (const cell of grid.each_cell()) {
          visited_neighbors = cell.neighbors.filter(cell => cell.links_length)
          if (!cell.links_length && visited_neighbors.length) {
            current = cell
            neighbor = sample(visited_neighbors)
            current.link(neighbor)
            break
          }
        }
      }
    } // end while
  }
}