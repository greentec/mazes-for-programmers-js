export default class RowState {
  constructor(starting_set = 0) {
    this.cells_in_set = {}
    this.set_for_cell = []
    this.next_set = starting_set
  }

  record(set, cell) {
    this.set_for_cell[cell.column] = set

    if (!this.cells_in_set.hasOwnProperty(set)) this.cells_in_set[set] = []
    this.cells_in_set[set].push(cell)
  }

  set_for(cell) {
    if (!this.set_for_cell[cell.column]) {
      this.record(this.next_set, cell)
      this.next_set += 1
    }

    return this.set_for_cell[cell.column]
  }

  merge(winner, loser) {
    for (let i = 0; i < this.cells_in_set[loser].length; i += 1) {
      const cell = this.cells_in_set[loser][i]
      this.set_for_cell[cell.column] = winner
      this.cells_in_set[winner].push(cell)
    }

    delete this.cells_in_set[loser]
  }

  next() {
    return new RowState(this.next_set)
  }

  * each_set() {
    for (const [set, cells] of Object.entries(this.cells_in_set))
      yield [set, cells]

  }
}