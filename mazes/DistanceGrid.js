import Grid from './Grid.js'

export default class DistanceGrid extends Grid {
  constructor(rows, columns) {
    super(rows, columns)
    this.distances = null
  }

  contents_of(cell) {
    if (this.distances && this.distances.get_cell(cell))
      return this.distances.get_cell(cell).toString(36)
    return super.contents_of(cell)
  }

  toString() {
    let output = ''
    output += '+' + '---+'.repeat(this.columns) + '\n'
    for (const row of this.grid) {
      let top = '|'
      let bottom = '+'
      for (const cell of row) {
        const body = ` ${this.contents_of(cell)} `
        const east_boundary = (cell.east && cell.isLinked(cell.east)) ? ' ' : '|'
        top += body + east_boundary
        const south_boundary = (cell.south && cell.isLinked(cell.south)) ? '   ' : '---'
        const corner = '+'
        bottom += south_boundary + corner
      }
      output += top + '\n'
      output += bottom + '\n'
    }
    return output
  }
}