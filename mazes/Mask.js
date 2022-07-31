export default class Mask {
  constructor(rows, columns = rows) {
    this.rows = rows
    this.columns = columns
    //  bool matrix indicating cells on/off
    this.bits = new Array(this.rows)
    for (let i = 0; i < this.rows; i += 1) {
      this.bits[i] = new Array(this.columns)
      for (let j = 0; j < this.columns; j += 1)
        this.bits[i][j] = true
    }
  }

  get(row, column) {
    if (row >= 0 && row < this.rows && column >= 0 && column < this.columns)
      return this.bits[row][column]
    return false
  }

  set(row, column, is_on) {
    this.bits[row][column] = is_on
  }

  get count() {
    let count = 0
    for (let i = 0; i < this.rows; i += 1)
      for (let j = 0; j < this.columns; j += 1)
        if (this.bits[i][j]) count += 1
    return count
  }

  get random_location() {
    let row, col
    do {
      row = Math.floor(Math.random() * this.rows)
      col = Math.floor(Math.random() * this.columns)
    } while (!this.get(row, col))
    return [row, col]
  }

  static from_txt(string) {
    const lines = string.split(' ')
    const rows = lines.length
    const columns = lines[0].length
    const mask = new Mask(rows, columns)

    for (let i = 0; i < rows; i += 1)
      for (let j = 0; j < columns; j += 1)
        mask.set(i, j, lines[i][j] != 'X')

    return mask
  }

  static from_img(imageData) {
    const { height } = imageData
    const { width } = imageData
    const mask = new Mask(height, width)
    for (let i = 0; i < height; i += 1)
      for (let j = 0; j < width; j += 1) {
        const imgIndex = (i * width + j) * 4
        mask.set(i, j, imageData.data[imgIndex] != 0)
      }
    return mask
  }
}