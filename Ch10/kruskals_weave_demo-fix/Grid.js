import Cell from '../../mazes/Cell.js'

export default class Grid {
  constructor(rows, columns) {
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
    if (row < 0 || row > this.rows - 1) 		 return null
    if (column < 0 || column > this.grid[row].length - 1) return null
    return this.grid[row][column]
  }

  get random_cell() {
    const row = Math.floor(Math.random() * this.rows)
    const column = Math.floor(Math.random() * this.grid[row].length)

    return this.cell(row, column)
  }

  get size() {
    return this.rows * this.columns
  }

  * each_row() {
    for (let i = 0; i < this.rows; i += 1)
      yield this.grid[i]

  }

  * each_cell() {
    const row_gen = this.each_row()
    for (let i = 0; i < this.rows; i += 1) {
      const row = row_gen.next().value
      for (let j = 0; j < row.length; j += 1)
        if (row[j]) yield row[j]
    }
  }

  contents_of(cell) {
    return ' '
  }

  toString() {
    let output = ''
    output += '+' + '---+'.repeat(this.columns) + '\n'
    const row_gen = this.each_row()
    while (true) {
      const row = row_gen.next().value
      if (!row) break

      let top = '|'
      let bottom = '+'

      for (let j = 0; j < row.length; j += 1) {
        let cell = row[j]
        if (!cell) cell = new Cell(-1, -1)

        const body = '   '
        const east_boundary = (cell.east && cell.linked(cell.east)) ? ' ' : '|'
        top += body + east_boundary

        const south_boundary = (cell.south && cell.linked(cell.south)) ? '   ' : '---'
        const corner = '+'
        bottom += south_boundary + corner
      }

      output += top + '\n'
      output += bottom + '\n'
    }
    return output
  }

  draw(ctx, cellSize = 10, inset = 0) {
    ctx.strokeStyle = 'black'

    inset = Math.floor(cellSize * inset)

    const cell_gen = this.each_cell()
    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break

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

    if (cell.north && cell.linked(cell.north)) {
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
    if (cell.south && cell.linked(cell.south)) {
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
    if (cell.west && cell.linked(cell.west)) {
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
    if (cell.east && cell.linked(cell.east)) {
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

  deadends() {
    const list = []

    const cell_gen = this.each_cell()
    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break
      if (cell.get_links().length == 1)
        list.push(cell)
    }

    return list
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  braid(p = 1.0) {
    const deadends = this.deadends()
    this.shuffle(deadends)

    deadends.forEach(cell => {
      if (cell.get_links().length != 1 || Math.random() > p)
        return

      const neighbors = cell.neighbors().filter(c => !c.linked(cell))
      let best = neighbors.filter(c => c.get_links().length == 1)
      if (best.length == 0) best = neighbors

      const neighbor = best[Math.floor(Math.random() * best.length)]
      cell.link(neighbor)
    }, this)
  }
}