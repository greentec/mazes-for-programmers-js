const shuffle = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export class State {
  constructor(grid) {
    this.grid = grid
    this.neighbors = []
    this.set_for_cell = {}
    this.cells_in_set = {}

    const cell_gen = grid.each_cell()

    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break

      const set = Object.keys(this.set_for_cell).length
      this.set_for_cell[cell.id] = set
      this.cells_in_set[set] = [cell]

      if (cell.south) this.neighbors.push([cell, cell.south])
      if (cell.east) this.neighbors.push([cell, cell.east])
    }
  }

  can_merge(left, right) {
    return this.set_for_cell[left.id] != this.set_for_cell[right.id]
  }

  merge(left, right) {
    left.link(right)

    const winner = this.set_for_cell[left.id]
    const loser = this.set_for_cell[right.id]
    const losers = this.cells_in_set[loser] || [right]
    if (winner == loser) return

    for (let i = 0; i < losers.length; i += 1) {
      const cell = losers[i]
      this.cells_in_set[winner].push(cell)
      this.set_for_cell[cell.id] = winner
    }

    delete this.cells_in_set[loser]
  }

  add_crossing(cell) {
    if (cell.links_length > 0 ||
			!this.can_merge(cell.east, cell.west) ||
			!this.can_merge(cell.north, cell.south))
      return false

    // this.neighbors = this.neighbors.filter(c => c[0].id != cell.id && c[1].id != cell.id )

    if (Math.random() < 0.5) {
      if (cell.west.id == cell.id ||
				cell.id == cell.east.id ||
				cell.north.id == cell.north.south.id ||
				cell.south.id == cell.south.north.id)
        return false

      this.neighbors = this.neighbors.filter(c => c[0].id != cell.id && c[1].id != cell.id)

      this.merge(cell.west, cell)
      this.merge(cell, cell.east)

      this.grid.tunnel_under(cell)
      this.merge(cell.north, cell.north.south)
      this.merge(cell.south, cell.south.north)
    } else {
      if (cell.north.id == cell.id ||
				cell.id == cell.south.id ||
				cell.west.id == cell.west.east.id ||
				cell.east.id == cell.east.west.id)
        return false

      this.neighbors = this.neighbors.filter(c => c[0].id != cell.id && c[1].id != cell.id)

      this.merge(cell.north, cell)
      this.merge(cell, cell.south)

      this.grid.tunnel_under(cell)
      this.merge(cell.west, cell.west.east)
      this.merge(cell.east, cell.east.west)
    }

    return true
  }
}

export default class Kruskals {
  static on(grid, state = new State(grid)) {
    const { neighbors } = state
    shuffle(neighbors)

    while (neighbors.length > 0) {
      const [left, right] = neighbors.pop()
      if (state.can_merge(left, right)) state.merge(left, right)
    }
  }
}
