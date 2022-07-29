export default class Wilsons {
  on(grid) {
    let unvisited = []
    const cell_gen = grid.each_cell()
    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break
      unvisited.push(cell)
    }

    const first = unvisited[Math.floor(Math.random() * unvisited.length)]
    unvisited = unvisited.filter(cell => cell.id !== first.id)

    while (unvisited.length > 0) {
      let cell = unvisited[Math.floor(Math.random() * unvisited.length)]
      let path = [cell]

      while (unvisited.some(x => x.id === cell.id)) {
        const neighbors = cell.neighbors()
        cell = neighbors[Math.floor(Math.random() * neighbors.length)]
        const position = path.findIndex(x => x.id === cell.id)
        if (position != -1)
          path = path.slice(0, position + 1)
        else
          path.push(cell)
      }

      for (let i = 0; i <= path.length - 2; i += 1) {
        path[i].link(path[i + 1])
        unvisited = unvisited.filter(cell => cell.id !== path[i].id)
      }
    }
  }
}