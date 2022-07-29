import Grid from './Grid.js'
import { OverCell, UnderCell } from './WeaveCells.js'

export default class WeaveGrid extends Grid {
  constructor(rows, columns) {
    super(rows, columns)
    this.under_cells = []
  }

  prepare_grid() {
    this.grid = new Array(this.rows)
    for (let i = 0; i < this.rows; i += 1) {
      this.grid[i] = new Array(this.columns)
      for (let j = 0; j < this.columns; j += 1)
        this.grid[i][j] = new OverCell(i, j, this)

    }
  }

  tunnel_under(over_cell) {
    const under_cell = new UnderCell(over_cell)
    this.under_cells.push(under_cell)
  }

  * each_cell() {
    const row_gen = this.each_row()
    for (let i = 0; i < this.rows; i += 1) {
      const row = row_gen.next().value
      for (let j = 0; j < row.length; j += 1)
        if (row[j]) yield row[j]

    }

    for (let i = 0; i < this.under_cells.length; i += 1)
      if (this.under_cells[i]) yield this.under_cells[i]

  }

  to_img(ctx, cellSize = 10, inset = 0) {
    inset = (inset || 0.1)
    super.to_img(ctx, cellSize, inset)
  }

  to_img_with_inset(ctx, cell, cellSize, x, y, inset) {
    if (cell.constructor.name == 'OverCell')
      super.to_img_with_inset(ctx, cell, cellSize, x, y, inset)
    else {
      let x1, x2, x3, x4, y1, y2, y3, y4;
      [x1, x2, x3, x4, y1, y2, y3, y4] = this.cell_coordinates_with_inset(x, y, cellSize, inset)

      if (cell.is_vertical_passage()) {
        ctx.moveTo(x2, y1)
        ctx.lineTo(x2, y2)
        ctx.moveTo(x3, y1)
        ctx.lineTo(x3, y2)
        ctx.moveTo(x2, y3)
        ctx.lineTo(x2, y4)
        ctx.moveTo(x3, y3)
        ctx.lineTo(x3, y4)
        ctx.stroke()
      } else {
        ctx.moveTo(x1, y2)
        ctx.lineTo(x2, y2)
        ctx.moveTo(x1, y3)
        ctx.lineTo(x2, y3)
        ctx.moveTo(x3, y2)
        ctx.lineTo(x4, y2)
        ctx.moveTo(x3, y3)
        ctx.lineTo(x4, y3)
        ctx.stroke()
      }
    }
  }
}