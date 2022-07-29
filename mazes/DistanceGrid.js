import Grid from './Grid.js'

export default class DistanceGrid extends Grid {
  constructor(rows, columns) {
    super(rows, columns)

    // this.rows = rows
    // this.columns = columns

    // this.prepare_grid()
    // this.configure_cells()
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
    const row_gen = this.each_row()
    while (true) {
      const row = row_gen.next().value
      if (!row) break

      let top = '|'
      let bottom = '+'

      for (let j = 0; j < row.length; j += 1) {
        const cell = row[j]

        // let body = '   '
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