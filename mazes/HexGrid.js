import Grid from './Grid.js'
import HexCell from './HexCell.js'

const output = document.getElementById('output')
const ctx = output.getContext('2d')

export default class HexGrid extends Grid {
  prepare_grid() {
    this.grid = new Array(this.rows)
    for (let i = 0; i < this.rows; i += 1) {
      this.grid[i] = new Array(this.columns)
      for (let j = 0; j < this.columns; j += 1)
        this.grid[i][j] = new HexCell(i, j)
    }
  }

  configure_cells() {
    for (const cell of this.each_cell()) {
      const { row, column: col } = cell
      let north_diagonal
      let south_diagonal

      if (col % 2 == 0) {
        north_diagonal = row - 1
        south_diagonal = row
      } else {
        north_diagonal = row
        south_diagonal = row + 1
      }

      cell.northwest = this.cell(north_diagonal, col - 1)
      cell.north = this.cell(row - 1, col)
      cell.northeast = this.cell(north_diagonal, col + 1)
      cell.southwest = this.cell(south_diagonal, col - 1)
      cell.south = this.cell(row + 1, col)
      cell.southeast = this.cell(south_diagonal, col + 1)
    }
  }

  cell(row, column) {
    if (row < 0 || row > this.rows - 1) return null
    if (column < 0 || column > this.columns - 1) return null
    return this.grid[row][column]
  }

  draw(cellSize) {
    ctx.strokeStyle = 'black'

    const a_size = cellSize / 2.0
    const b_size = cellSize * Math.sqrt(3) / 2.0
    const height = b_size * 2

    for (const cell of this.each_cell()) {
      const cx = cellSize + 3 * cell.column * a_size
      let cy = b_size + cell.row * height
      if (cell.column % 2 == 1) cy += b_size

      const x_fw = Math.floor(cx - cellSize)
      const x_nw = Math.floor(cx - a_size)
      const x_ne = Math.floor(cx + a_size)
      const x_fe = Math.floor(cx + cellSize)

      const y_n = Math.floor(cy - b_size)
      const y_m = Math.floor(cy)
      const y_s = Math.floor(cy + b_size)

      if (this.distances) {
        ctx.beginPath()
        ctx.fillStyle = this.background_color_for(cell)
        const p = new Path2D(`M ${x_fw} ${y_m} L ${x_nw} ${y_n} L ${x_ne} ${y_n} L ${x_fe} ${y_m} L ${x_ne} ${y_s} L ${x_nw} ${y_s} Z`)
        ctx.fill(p)
        ctx.closePath()
      }

      if (!cell.southwest) {
        ctx.moveTo(x_fw, y_m)
        ctx.lineTo(x_nw, y_s)
        ctx.stroke()
      }
      if (!cell.northwest) {
        ctx.moveTo(x_fw, y_m)
        ctx.lineTo(x_nw, y_n)
        ctx.stroke()
      }
      if (!cell.north) {
        ctx.moveTo(x_nw, y_n)
        ctx.lineTo(x_ne, y_n)
        ctx.stroke()
      }
      if (!cell.linked(cell.northeast)) {
        ctx.moveTo(x_ne, y_n)
        ctx.lineTo(x_fe, y_m)
        ctx.stroke()
      }
      if (!cell.linked(cell.southeast)) {
        ctx.moveTo(x_fe, y_m)
        ctx.lineTo(x_ne, y_s)
        ctx.stroke()
      }
      if (!cell.linked(cell.south)) {
        ctx.moveTo(x_ne, y_s)
        ctx.lineTo(x_nw, y_s)
        ctx.stroke()
      }
    }
  }
}