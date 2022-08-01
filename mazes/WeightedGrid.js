import Grid from './Grid.js'
import WeightedCell from './WeightedCell.js'
import { darkGreenFill } from './utils.js'

const defaultCanvas = document.getElementById('output')
const defaultContext = defaultCanvas.getContext('2d')

export default class WeightedGrid extends Grid {
  prepare_grid() {
    this.grid = new Array(this.rows)
    for (let i = 0; i < this.rows; i += 1) {
      this.grid[i] = new Array(this.columns)
      for (let j = 0; j < this.columns; j += 1)
        this.grid[i][j] = new WeightedCell(i, j) // istead of Cell
    }
  }

  background_color_for(cell) {
    if (cell.weight > 1) return 'red'
    if (!this.distances) return 'white'
    const distance = this.distances.get(cell)
    if (!distance) return 'white'
    return darkGreenFill (this.maximum, distance)
  }

  draw(cellSize, ctx = defaultContext) {
    ctx.canvas.width = cellSize * this.rows + 1
    ctx.canvas.height = cellSize * this.columns + 1

    for (const cell of this.each_cell()) {
      const x1 = cell.column * cellSize
      const y1 = cell.row * cellSize
      const x2 = (cell.column + 1) * cellSize
      const y2 = (cell.row + 1) * cellSize

      if (this.distances) {
        ctx.fillStyle = this.background_color_for(cell)
        ctx.fillRect(x1, y1, cellSize, cellSize)
      }

      if (!cell.north) {
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y1)
        ctx.stroke()
      }
      if (!cell.west) {
        ctx.moveTo(x1, y1)
        ctx.lineTo(x1, y2)
        ctx.stroke()
      }
      if (!cell.isLinked(cell.east)) {
        ctx.moveTo(x2, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
      if (!cell.isLinked(cell.south)) {
        ctx.moveTo(x1, y2)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
    }
  }
}