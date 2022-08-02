import Cell from './Cell.js'
import { shadeOfGreen, shuffle } from './utils.js'

const defaultCanvas = document.getElementById('output')
const defaultContext = defaultCanvas.getContext('2d')

export default class Grid {
  constructor(rows, columns = rows) {
    this.rows = rows
    this.columns = columns
    this.prepare_grid()
    this.configure_cells()
  }

  prepare_grid() {
    this.grid = new Array(this.rows)
    for (let i = 0; i < this.rows; i += 1) {
      this.grid[i] = new Array(this.columns)
      for (let j = 0; j < this.columns; j += 1)
        this.grid[i][j] = new Cell(i, j)
    }
  }

  configure_cells() {
    for (let i = 0; i < this.rows; i += 1)
      for (let j = 0; j < this.columns; j += 1) {
        const cell = this.cell(i, j)
        if (cell == null) continue
        const { row } = cell
        const col = cell.column
        if (row > 0) cell.north = this.cell(row - 1, col)
        if (row < this.rows - 1) cell.south = this.cell(row + 1, col)
        if (col > 0) cell.west = this.cell(row, col - 1)
        if (col < this.columns - 1) cell.east = this.cell(row, col + 1)
      }
  }

  cell(row, column) {
    if (row < 0 || row > this.rows - 1) return null
    if (column < 0 || column > this.grid[row].length - 1) return null
    return this.grid[row][column]
  }

  cell_by_id(id) {
    const [row, col] = id.split('#').map(Number)
    return this.cell(row, col)
  }

  * each_row() {
    for (const row of this.grid)
      yield row
  }

  * each_cell() {
    for (const row of this.grid)
      for (const cell of row)
        if (cell) yield cell
  }

  get random_cell() {
    const row = Math.floor(Math.random() * this.rows)
    const column = Math.floor(Math.random() * this.grid[row].length)
    return this.cell(row, column)
  }

  get size() {
    return this.rows * this.columns
  }

  set distances(distances) {
    this._distances = distances
    const [_, maximum] = distances.max()
    this.maximum = maximum
  }

  get distances() {
    return this._distances
  }

  get middle_cell() {
    return this.cell(Math.floor(this.rows / 2), Math.floor(this.columns / 2))
  }

  get last_cell() {
    return this.cell(this.rows - 1, this.columns - 1)
  }

  get first_cell() {
    return this.cell(0, 0)
  }

  background_color_for(cell) {
    if (!this.distances) return 'white'
    const distance = this.distances.get(cell)
    return shadeOfGreen(this.maximum, distance)
  }

  contents_of(cell) {
    if (this.distances && this.distances.get(cell))
      return this.distances.get(cell).toString(36) // base-36 int, because we’re limited to one character
    return ' '
  }

  toString() {
    let output = ''
    output += '+' + '---+'.repeat(this.columns) + '\n'
    for (const row of this.grid) {
      let top = '|'
      let bottom = '+'
      for (const cell of row) {
        if (!cell) continue
        const body = ` ${this.contents_of(cell)} `
        const east_boundary = cell.linked(cell.east) ? ' ' : '|'
        top += body + east_boundary
        const south_boundary = cell.linked(cell.south) ? '   ' : '---'
        const corner = '+'
        bottom += south_boundary + corner
      }
      output += top + '\n' + bottom + '\n'
    }
    return output
  }

  // TODO: with inset
  drawDistance(cellSize = 20, ctx = defaultContext) {
    ctx.canvas.width = cellSize * this.rows + 1
    ctx.canvas.height = cellSize * this.columns + 1

    for (const cell of this.each_cell()) {
      const x1 = cell.column * cellSize
      const y1 = cell.row * cellSize
      const x2 = (cell.column + 1) * cellSize
      const y2 = (cell.row + 1) * cellSize

      ctx.fillStyle = this.background_color_for(cell) // calc distance
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
      if ((cell.east && !cell.linked(cell.east)) || !cell.east) {
        ctx.moveTo(x2, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
      if ((cell.south && !cell.linked(cell.south)) || !cell.south) {
        ctx.moveTo(x1, y2)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
    }
  }

  draw(cellSize = 20, inset = 0, ctx = defaultContext) {
    ctx.canvas.width = cellSize * this.rows + 1
    ctx.canvas.height = cellSize * this.columns + 1
    inset = Math.floor(cellSize * inset)

    for (const cell of this.each_cell()) {
      const x = cell.column * cellSize
      const y = cell.row * cellSize
      if (inset > 0)
        this.to_img_with_inset(ctx, cell, cellSize, x, y, inset)
      else
        this.to_img_without_inset(ctx, cell, cellSize, x, y)
    }
  }

  to_img_without_inset(ctx, cell, cellSize, x, y) {
    const x1 = x
    const y1 = y
    const x2 = x1 + cellSize
    const y2 = y1 + cellSize

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
    if (!cell.linked(cell.east)) {
      ctx.moveTo(x2, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
    if (!cell.linked(cell.south)) {
      ctx.moveTo(x1, y2)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
  }

  cell_coordinates_with_inset(x, y, cellSize, inset) {
    const x1 = x
    const x4 = x + cellSize
    const x2 = x1 + inset
    const x3 = x4 - inset

    const y1 = y
    const y4 = y + cellSize
    const y2 = y1 + inset
    const y3 = y4 - inset

    return [x1, x2, x3, x4, y1, y2, y3, y4]
  }

  to_img_with_inset(ctx, cell, cellSize, x, y, inset) {
    let x1, x2, x3, x4, y1, y2, y3, y4;
    [x1, x2, x3, x4, y1, y2, y3, y4] = this.cell_coordinates_with_inset(x, y, cellSize, inset)

    if (cell.linked(cell.north)) {
      ctx.moveTo(x2, y1)
      ctx.lineTo(x2, y2)
      ctx.moveTo(x3, y1)
      ctx.lineTo(x3, y2)
      ctx.stroke()
    } else {
      ctx.moveTo(x2, y2)
      ctx.lineTo(x3, y2)
      ctx.stroke()
    }
    if (cell.linked(cell.south)) {
      ctx.moveTo(x2, y3)
      ctx.lineTo(x2, y4)
      ctx.moveTo(x3, y3)
      ctx.lineTo(x3, y4)
      ctx.stroke()
    } else {
      ctx.moveTo(x2, y3)
      ctx.lineTo(x3, y3)
      ctx.stroke()
    }
    if (cell.linked(cell.west)) {
      ctx.moveTo(x1, y2)
      ctx.lineTo(x2, y2)
      ctx.moveTo(x1, y3)
      ctx.lineTo(x2, y3)
      ctx.stroke()
    } else {
      ctx.moveTo(x2, y2)
      ctx.lineTo(x2, y3)
      ctx.stroke()
    }
    if (cell.linked(cell.east)) {
      ctx.moveTo(x3, y2)
      ctx.lineTo(x4, y2)
      ctx.moveTo(x3, y3)
      ctx.lineTo(x4, y3)
      ctx.stroke()
    } else {
      ctx.moveTo(x3, y2)
      ctx.lineTo(x3, y3)
      ctx.stroke()
    }
  }

  get deadends() {
    const list = []
    for (const cell of this.each_cell())
      if (cell.links_length == 1)
        list.push(cell)
    return list
  }

  braid(percent = 1.0) {
    const { deadends } = this
    shuffle(deadends)

    deadends.forEach(cell => {
      if (cell.links_length != 1 || Math.random() > percent)
        return

      const neighbors = cell.neighbors.filter(c => !c.linked(cell))
      let best = neighbors.filter(c => c.links_length == 1)
      if (best.length == 0) best = neighbors

      const neighbor = best[Math.floor(Math.random() * best.length)]
      cell.link(neighbor)
    })
  }
}