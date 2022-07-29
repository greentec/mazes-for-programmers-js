export default class BinaryTree {
  on(grid) {
    const cell_gen = grid.each_cell()
    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break

      const neighbors = []
      if (cell.north) neighbors.push(cell.north)
      if (cell.east) neighbors.push(cell.east)

      const index = Math.floor(Math.random() * neighbors.length)
      const neighbor = neighbors[index]

      if (neighbor) cell.link(neighbor)
    }
  }
}