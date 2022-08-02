import { sample } from '../utils.js'

export default class Wilsons {
  static on(grid) {
    let unvisited = []
    for (const cell of grid.each_cell()) unvisited.push(cell)

    const first = sample(unvisited)
    unvisited = unvisited.filter(cell => cell.id !== first.id)

    while (unvisited.length) {
      let cell = sample(unvisited)
      let path = [cell]

      while (unvisited.some(x => x.id === cell.id)) {
        const { neighbors } = cell
        cell = sample(neighbors)
        const index = path.findIndex(x => x.id === cell.id)
        if (index != -1)
          path = path.slice(0, index + 1)
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