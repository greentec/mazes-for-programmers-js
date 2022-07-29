import Grid from './Grid.js'
import PolarCell from './PolarCell.js'

export default class PolarGrid extends Grid {
  constructor(rows, columns) {
    super(rows, 1)
  }

  prepare_grid() {
    const rows = new Array(this.rows)

    const row_height = 1.0 / this.rows
    rows[0] = [new PolarCell(0, 0)]

    for (let i = 1; i <= this.rows; i += 1) {
      const radius = i * 1.0 / this.rows
      const circumference = 2 * Math.PI * radius

      const previous_count = rows[i - 1].length
      const estimated_cell_width = circumference / previous_count
      const ratio = Math.round(estimated_cell_width / row_height)

      const cells = previous_count * ratio
      rows[i] = new Array(cells)
      for (let j = 0; j < cells; j += 1)
        rows[i][j] = new PolarCell(i, j)

    }

    this.grid = rows
  }

  configure_cells() {
    const cell_gen = this.each_cell()
    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break

      const { row } = cell
      const col = cell.column

      if (row > 0) {
        cell.cw = this.get_cell(row, col + 1)
        cell.ccw = this.get_cell(row, col - 1)

        const ratio = this.grid[row].length / this.grid[row - 1].length
        const parent = this.grid[row - 1][Math.floor(col / ratio)]
        parent.outward.push(cell)
        cell.inward = parent
      }

    }
  }

  get_cell(row, column) {
    if (row < 0 || row > this.rows - 1) 		 return null
    // if (column < 0 || column > this.grid[row].length) return null
    return this.grid[row][column % this.grid[row].length]
  }

  get_random_cell() {
    const row = Math.floor(Math.random() * this.rows)
    const col = Math.floor(Math.random() * this.grid[row].length)

    return this.get_cell(row, col)
  }

  to_img(ctx, cellSize = 10) {
    ctx.strokeStyle = 'black'

    const img_size = 2 * this.rows * cellSize
    const center = img_size / 2

    const cell_gen = this.each_cell()
    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break
      if (cell.row == 0) continue

      const theta 		 = 2 * Math.PI / this.grid[cell.row].length
      const inner_radius = cell.row * cellSize
      const outer_radius = (cell.row + 1) * cellSize
      const theta_ccw	 = cell.column * theta
      const theta_cw	 = (cell.column + 1) * theta

      const ax = center + Math.floor(inner_radius * Math.cos(theta_ccw))
      const ay = center + Math.floor(inner_radius * Math.sin(theta_ccw))
      const bx = center + Math.floor(outer_radius * Math.cos(theta_ccw))
      const by = center + Math.floor(outer_radius * Math.sin(theta_ccw))
      const cx = center + Math.floor(inner_radius * Math.cos(theta_cw))
      const cy = center + Math.floor(inner_radius * Math.sin(theta_cw))
      const dx = center + Math.floor(outer_radius * Math.cos(theta_cw))
      const dy = center + Math.floor(outer_radius * Math.sin(theta_cw))

      if ((cell.inward && !cell.isLinked(cell.inward)) || !cell.inward) {
        ctx.moveTo(ax, ay)
        ctx.lineTo(cx, cy)
        ctx.stroke()
      }
      if ((cell.cw && !cell.isLinked(cell.cw)) || !cell.cw) {
        ctx.moveTo(cx, cy)
        ctx.lineTo(dx, dy)
        ctx.stroke()
      }
    }

    ctx.arc(center, center, this.rows * cellSize, 0, 2 * Math.PI)
    ctx.stroke()
  }
}