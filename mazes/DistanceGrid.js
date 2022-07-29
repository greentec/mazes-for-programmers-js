import Grid from './Grid.js'

export default class DistanceGrid extends Grid {
  contents_of(cell) {
    if (this.distances && this.distances.get_cell(cell))
      return this.distances.get_cell(cell).toString(36) // base-36 int, because we’re limited to one character
    return super.contents_of(cell)
  }
}