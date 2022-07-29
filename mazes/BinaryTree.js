export default class BinaryTree {
  static on(grid) {
    for (const cell of grid.each_cell()) {
      const neighbors = []
      if (cell.north) neighbors.push(cell.north)
      if (cell.east) neighbors.push(cell.east)

      const index = Math.floor(Math.random() * neighbors.length)
      const neighbor = neighbors[index]

      if (neighbor) cell.link(neighbor)
    }
  }
}