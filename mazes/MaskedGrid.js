import Grid from './Grid.js'
import Cell from './Cell.js'

export default class MaskedGrid extends Grid {
  constructor(mask) {
    super(mask.rows, mask.columns)
    this.mask = mask
    this.prepare_grid()
    this.configure_cells()
  }

  prepare_grid() {
    if (!this.mask) return

    this.grid = new Array(this.rows)
    for (let i = 0; i < this.rows; i += 1) {
      this.grid[i] = new Array(this.columns)
      for (let j = 0; j < this.columns; j += 1)
        if (this.mask.get(i, j)) this.grid[i][j] = new Cell(i, j)
    }
  }

  configure_cells() {
    if (!this.mask) return
    super.configure_cells()
  }

  get random_cell() {
    const [row, column] = this.mask.random_location
    return this.cell(row, column)
  }

  get size() {
    return this.mask.count
  }
}