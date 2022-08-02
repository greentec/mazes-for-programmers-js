import Grid from './Grid.js'
import TriangleCell from './TriangleCell.js'

const output = document.getElementById('output')
const ctx = output.getContext('2d')

export default class TriangleGrid extends Grid {

  prepare_grid() {
    this.grid = new Array(this.rows)
    for (let i = 0; i < this.rows; i += 1) {
      this.grid[i] = new Array(this.columns)
      for (let j = 0; j < this.columns; j += 1)
        this.grid[i][j] = new TriangleCell(i, j)
    }
  }

  configure_cells() {
    for (const cell of this.each_cell()) {
      const { row, column: col } = cell

      cell.west = this.cell(row, col - 1)
      cell.east = this.cell(row, col + 1)
      if (cell.isUpright())
        cell.south = this.cell(row + 1, col)
      else
        cell.north = this.cell(row - 1, col)
    }
  }

  draw(cellSize = 16) {
    ctx.strokeStyle = 'black'

    const half_width = cellSize / 2.0
    const height = cellSize * Math.sqrt(3) / 2.0
    const half_height = height / 2.0

    for (const cell of this.each_cell()) {
      const cx = half_width + cell.column * half_width
      const cy = half_height + cell.row * height

      const west_x = Math.floor(cx - half_width)
      const mid_x = Math.floor(cx)
      const east_x = Math.floor(cx + half_width)

      let apex_y
      let base_y

      if (cell.isUpright()) {
        apex_y = Math.floor(cy - half_height)
        base_y = Math.floor(cy + half_height)
      } else {
        apex_y = Math.floor(cy + half_height)
        base_y = Math.floor(cy - half_height)
      }

      if (this.distances) {
        ctx.beginPath()
        ctx.fillStyle = this.background_color_for(cell)
        const p = new Path2D(`M ${west_x} ${base_y} L ${mid_x} ${apex_y} L ${east_x} ${base_y} Z`)
        ctx.fill(p)
        ctx.closePath()
      }

      if (!cell.west) {
        ctx.moveTo(west_x, base_y)
        ctx.lineTo(mid_x, apex_y)
        ctx.stroke()
      }
      if ((cell.east && !cell.linked(cell.east)) || !cell.east) {
        ctx.moveTo(east_x, base_y)
        ctx.lineTo(mid_x, apex_y)
        ctx.stroke()
      }

      const no_south = cell.isUpright() && cell.south == null
      const not_linked = !cell.isUpright() && ((cell.north && !cell.linked(cell.north)) || !cell.north)

      if (no_south || not_linked) {
        ctx.moveTo(east_x, base_y)
        ctx.lineTo(west_x, base_y)
        ctx.stroke()
      }
    }
  }
}