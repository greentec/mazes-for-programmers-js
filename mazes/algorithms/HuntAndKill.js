import { sample } from '../utils.js'

export default class HuntAndKill {
  static on(grid) {
    let current = grid.random_cell

    while (current) {
      const unvisited_neighbors = current.neighbors.filter(cell => cell.unvisited)
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
          if (cell.unvisited && visited_neighbors.length) {
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