import Grid from './Grid.js'

const output = document.getElementById('output')
const ctx = output.getContext('2d')

export default class ColoredGrid extends Grid {

  draw(cellSize = 20) {
    output.width = cellSize * this.rows + 1
    output.height = cellSize * this.columns + 1

    for (const cell of this.each_cell()) {
      const x1 = cell.column * cellSize
      const y1 = cell.row * cellSize
      const x2 = (cell.column + 1) * cellSize
      const y2 = (cell.row + 1) * cellSize

      ctx.fillStyle = this.background_color_for(cell)
      ctx.fillRect(x1, y1, cellSize, cellSize)

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
      if ((cell.east && !cell.isLinked(cell.east)) || !cell.east) {
        ctx.moveTo(x2, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
      if ((cell.south && !cell.isLinked(cell.south)) || !cell.south) {
        ctx.moveTo(x1, y2)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
    }
  }
}