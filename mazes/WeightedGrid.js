import Grid from './Grid.js'
import WeightedCell from './WeightedCell.js'

export default class WeightedGrid extends Grid {
  set_distances(distances) {
    this.distances = distances
    let farthest_id;
    [farthest_id, this.maximum] = distances.max()
  }

  prepare_grid() {
    this.grid = new Array(this.rows)
    for (let i = 0; i < this.rows; i += 1) {
      this.grid[i] = new Array(this.columns)
      for (let j = 0; j < this.columns; j += 1)
        this.grid[i][j] = new WeightedCell(i, j)
    }
  }

  background_color_for(cell) {
    if (cell.weight > 1) return 'rgb(255,0,0)'
    if (!this.distances) return 'rgb(255,255,255)'
    const distance = this.distances.get_cell(cell)
    if (!distance) return 'rgb(255,255,255)'
    const intensity = 64 + 191 * (this.maximum - distance) * 1.0 / this.maximum
    return `rgb(${intensity},${intensity},0)`
  }

  to_img(ctx, cellSize) {
    ctx.strokeStyle = 'black'
    const cell_gen = this.each_cell()

    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break

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