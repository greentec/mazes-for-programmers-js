import WeaveGrid from './WeaveGrid.js'
import { SimpleOverCell } from './WeaveCells.js'

export default class PreconfiguredGrid extends WeaveGrid {
  prepare_grid() {
    this.grid = new Array(this.rows)
    for (let i = 0; i < this.rows; i += 1) {
      this.grid[i] = new Array(this.columns)
      for (let j = 0; j < this.columns; j += 1)
        this.grid[i][j] = new SimpleOverCell(i, j, this)

    }
  }
}