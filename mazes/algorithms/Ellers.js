import { shuffle } from '../utils.js'

class RowState {
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

export default class Ellers {
  static on(grid) {
    let row_state = new RowState()

    for (const row of grid.each_row()) {
      for (const cell of row) {
        if (!cell.west) continue
        const set = row_state.set_for(cell)
        const prior_set = row_state.set_for(cell.west)

        const should_link = set != prior_set && (cell.south == null || Math.random() < 0.5)
        if (should_link) {
          cell.link(cell.west)
          row_state.merge(prior_set, set)
        }
      }

      if (row[0].south) {
        const next_row = row_state.next()
        for (const [set, cells] of row_state.each_set()) {
          shuffle(cells)
          cells.forEach((cell, i) => {
            if (i == 0 || Math.random() < 0.33) {
              cell.link(cell.south)
              next_row.record(row_state.set_for(cell), cell.south)
            }
          })
        }
        row_state = next_row
      }
    }
  }
}
