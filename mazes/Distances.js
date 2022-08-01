export default class Distances {
  constructor(root) {
    this.root = root
    this.cells = {} // cell_id: distance
    this.cells[root.id] = 0
  }

  get({ id }) {
    return this.cells[id]
  }

  set(cell, distance) {
    this.cells[cell.id] = distance
  }

  get random_id() {
    const cells = Object.keys(this.cells)
    return cells[Math.floor(Math.random() * cells.length)]
  }

  path_to(goal) {
    let current = goal
    const breadcrumbs = new Distances(this.root)
    breadcrumbs.cells[current.id] = this.cells[current.id]

    while (current.id !== this.root.id)
      for (const neighbor of Object.values(current.links))
        if (this.cells[neighbor.id] < this.cells[current.id]) {
          breadcrumbs.cells[neighbor.id] = this.cells[neighbor.id]
          current = neighbor
          break
        }

    return breadcrumbs
  }

  max() {
    let max_distance = 0
    let max_cell_id = this.root.id

    for (const [id, distance] of Object.entries(this.cells))
      if (distance > max_distance) {
        max_cell_id = id
        max_distance = distance
      }

    return [max_cell_id, max_distance]
  }
}