import Grid from './Grid.js'
import PolarCell from './PolarCell.js'

const output = document.getElementById('output')
const ctx = output.getContext('2d')

export default class PolarGrid extends Grid {
  constructor(rows) {
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
    for (const cell of this.each_cell()) {
      const { row, column } = cell

      if (row > 0) {
        cell.cw = this.cell(row, column + 1)
        cell.ccw = this.cell(row, column - 1)
        const ratio = this.grid[row].length / this.grid[row - 1].length
        const parent = this.grid[row - 1][Math.floor(column / ratio)]
        parent.outward.push(cell)
        cell.inward = parent
      }
    }
  }

  cell(row, column) {
    if (row < 0 || row > this.rows - 1) return null
    return this.grid[row][column % this.grid[row].length]
  }

  get random_cell() {
    const row = Math.floor(Math.random() * this.rows)
    const col = Math.floor(Math.random() * this.grid[row].length)
    return this.cell(row, col)
  }

  draw(ring_height = 10) {
    const img_size = 2 * this.rows * ring_height
    const center = img_size / 2

    for (const cell of this.each_cell()) {
      if (cell.row == 0) continue

      const cell_count = this.grid[cell.row].length
      const theta = 2 * Math.PI / cell_count
      const inner_radius = cell.row * ring_height
      const outer_radius = (cell.row + 1) * ring_height
      const theta_ccw = cell.column * theta // counter-clockwise wall
      const theta_cw = (cell.column + 1) * theta // clockwise wall

      const ax = center + Math.floor(inner_radius * Math.cos(theta_ccw))
      const ay = center + Math.floor(inner_radius * Math.sin(theta_ccw))
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

    ctx.arc(center, center, this.rows * ring_height, 0, 2 * Math.PI)
    ctx.stroke()
  }
}