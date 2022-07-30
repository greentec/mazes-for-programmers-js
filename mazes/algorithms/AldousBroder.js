export default class AldousBroder {
  static on(grid) {
    let cell = grid.random_cell
    let unvisited = grid.size - 1

    while (unvisited) {
      const { neighbors } = cell
      const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
      if (!neighbor.links_length) {
        cell.link(neighbor)
        unvisited -= 1
      }
      cell = neighbor
    }
  }
}