export default class RecursiveDivision {
  static on(grid) {
    this.grid = grid
    for (const cell of grid.each_cell())
      cell.neighbors.forEach(c => cell.link(c, false)) // removing all interior walls

    this.divide(0, 0, this.grid.rows, this.grid.columns)
  }

  static divide(row, column, height, width) {
    if (height <= 1 || width <= 1 || height < 5 && width < 5 && Math.random() < 0.25) return

    if (height > width)
      this.divide_horizontally(row, column, height, width)
    else
      this.divide_vertically(row, column, height, width)
  }

  static divide_horizontally(row, column, height, width) {
    const divide_south_of = Math.floor(Math.random() * (height - 1))
    const passage_at = Math.floor(Math.random() * width)

    for (let x = 0; x < width; x += 1) {
      if (passage_at == x) continue

      const cell = this.grid.cell(row + divide_south_of, column + x)
      cell.unlink(cell.south)
    }

    this.divide(row, column, divide_south_of + 1, width)
    this.divide(row + divide_south_of + 1, column, height - divide_south_of - 1, width)
  }

  static divide_vertically(row, column, height, width) {
    const divide_east_of = Math.floor(Math.random() * (width - 1))
    const passage_at = Math.floor(Math.random() * height)

    for (let y = 0; y < height; y += 1) {
      if (passage_at == y) continue

      const cell = this.grid.cell(row + y, column + divide_east_of)
      cell.unlink(cell.east)
    }

    this.divide(row, column, height, divide_east_of + 1)
    this.divide(row, column + divide_east_of + 1, height, width - divide_east_of - 1)
  }
}