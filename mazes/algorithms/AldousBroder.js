export default class AldousBroder {
  static on(grid) {
    let cell = grid.random_cell()
    let unvisited = grid.size - 1

    while (unvisited > 0) {
      const { neighbors } = cell
      const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
      if (neighbor.get_links().length == 0) {
        cell.link(neighbor)
        unvisited -= 1
      }
      cell = neighbor
    }
  }
}