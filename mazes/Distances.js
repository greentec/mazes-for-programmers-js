export default class Distances {
  constructor(root) {
    this.root = root
    this.cells = {}
    this.cells[this.root.id] = 0
  }

  get_cell(cell) {
    return this.cells[cell.id]
  }

  set_cell(cell, distance) {
    this.cells[cell.id] = distance
  }

  get_cells() {
    return Object.keys(this.cells)
  }

  path_to(goal) {
    let current = goal
    const breadcrumbs = new Distances(this.root)
    breadcrumbs.set_cell(current, this.get_cell(current))

    while (current.id !== this.root.id)
      for (const link in current.links) {
        const neighbor = current.links[link]
        if (this.get_cell(neighbor) < this.get_cell(current)) {
          breadcrumbs.set_cell(neighbor, this.get_cell(neighbor))
          current = neighbor
          break
        }
      }

    return breadcrumbs
  }

  max() {
    let max_distance = 0
    let max_cell_id = this.root.id

    for (const cell_id in this.cells) {
      const distance = this.cells[cell_id]
      if (distance > max_distance) {
        max_cell_id = cell_id
        max_distance = distance
      }
    }

    return [max_cell_id, max_distance]
  }
}