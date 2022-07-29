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
    for (let i = 0; i < this.rows; i += 1)
      for (let j = 0; j < this.columns; j += 1) {
        const cell = this.get_cell(i, j)
        if (cell == null) continue
        const { row } = cell
        const col = cell.column

        cell.west = this.get_cell(row, col - 1)
        cell.east = this.get_cell(row, col + 1)
        if (cell.isUpright())
          cell.south = this.get_cell(row + 1, col)

        else
          cell.north = this.get_cell(row - 1, col)
      }

  }

  set_distances(distances) {
    this.distances = distances
    let farthest_id;
    [farthest_id, this.maximum] = distances.max()
  }

  background_color_for(cell) {
    const distance = this.distances.get(cell)
    const intensity = (this.maximum - distance) * 1.0 / this.maximum
    const dark = Math.floor(255 * intensity)
    const bright = Math.floor(128 + 127 * intensity)
    return `rgb(${dark},${bright},${dark})`
  }

  to_img(cellSize = 16) {
    ctx.strokeStyle = 'black'

    const half_width = cellSize / 2.0
    const height = cellSize * Math.sqrt(3) / 2.0
    const half_height = height / 2.0

    const img_width = Math.floor(cellSize * (this.columns + 1) / 2.0)
    const img_height = Math.floor(height * this.rows)

    const cell_gen = this.each_cell()
    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break

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
      if ((cell.east && !cell.isLinked(cell.east)) || !cell.east) {
        ctx.moveTo(east_x, base_y)
        ctx.lineTo(mid_x, apex_y)
        ctx.stroke()
      }

      const no_south = cell.isUpright() && cell.south == null
      const not_linked = !cell.isUpright() && ((cell.north && !cell.isLinked(cell.north)) || !cell.north)

      if (no_south || not_linked) {
        ctx.moveTo(east_x, base_y)
        ctx.lineTo(west_x, base_y)
        ctx.stroke()
      }
    }
  }
}