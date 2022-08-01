import Cell from './Cell.js'

export default class HexCell extends Cell {
  constructor(row, column) {
    super(row, column)
    this.northeast = null
    this.northwest = null
    this.southeast = null
    this.southwest = null
  }

  get neighbors() {
    const list = []
    if (this.northwest) list.push(this.northwest)
    if (this.north) list.push(this.north)
    if (this.northeast) list.push(this.northeast)
    if (this.southwest) list.push(this.southwest)
    if (this.south) list.push(this.south)
    if (this.southeast) list.push(this.southeast)
    return list
  }
}