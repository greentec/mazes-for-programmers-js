import Distances from './Distances.js'

export default class Cell {
  constructor(row, column) {
    this.row = row
    this.column = column
    this.links = {}
    this.north = null
    this.south = null
    this.east = null
    this.west = null
  }

  link(cell, bidi = true) {
    this.links[cell.id] = cell
    if (bidi) cell.link(this, false)
  }

  unlink(cell, bidi = true) {
    delete this.links[cell.id]
    if (bidi) cell.unlink(this, false)
  }

  get_links() {
    return Object.keys(this.links)
  }

  isLinked(cell) {
    if (!cell) return false
    return this.links.hasOwnProperty(cell.id)
  }

  neighbors() {
    const list = []
    if (this.north) list.push(this.north)
    if (this.south) list.push(this.south)
    if (this.east) list.push(this.east)
    if (this.west) list.push(this.west)
    return list
  }

  get id() {
    return this.row + '#' + this.column
  }

  distances() {
    const distances = new Distances(this)
    let frontier = [this]

    while (frontier.length) {
      const new_frontier = []
      frontier.forEach(cell => {
        for (const link in cell.links) {
          const linked = cell.links[link]
          if (distances.get(linked) === undefined) { // 0 is valid
            distances.set(linked, distances.get(cell) + 1)
            new_frontier.push(linked)
          }
        }
      })
      frontier = new_frontier
    }
    return distances
  }
}