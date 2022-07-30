export default class HuntAndKill {
  on(grid) {
    let current = grid.random_cell()

    while (current) {
      const unvisited_neighbors = current.neighbors.filter(cell => cell.get_links().length == 0)
      let neighbor
      let visited_neighbors

      if (unvisited_neighbors.length > 0) {
        neighbor = unvisited_neighbors[Math.floor(Math.random() * unvisited_neighbors.length)]
        current.link(neighbor)
        current = neighbor
      } else {
        current = null
        const cell_gen = grid.each_cell()

        while (true) {
          const cell = cell_gen.next().value
          if (!cell) break
          visited_neighbors = cell.neighbors.filter(cell => cell.get_links().length > 0)
          if (cell.get_links().length == 0 && visited_neighbors.length > 0) {
            current = cell
            neighbor = visited_neighbors[Math.floor(Math.random() * visited_neighbors.length)]
            current.link(neighbor)
            break
          }
        }
      }
    }
  }
}