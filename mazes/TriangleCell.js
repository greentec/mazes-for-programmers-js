import Cell from './Cell.js'

export default class TriangleCell extends Cell {
  isUpright() {
    return (this.row + this.column) % 2 == 0
  }

  get neighbors() {
    const list = []
    if (this.west) list.push(this.west)
    if (this.east) list.push(this.east)
    if (!this.isUpright() && this.north) list.push(this.north)
    if (this.isUpright() && this.south) list.push(this.south)
    return list
  }
}