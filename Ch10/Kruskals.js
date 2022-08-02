export default class Kruskals {
  on(grid, state = null) {
    state = state || new State(grid)
    const { neighbors } = state
    this.shuffle(neighbors)

    while (neighbors.length > 0) {
      let left, right;
      [left, right] = neighbors.pop()
      if (state.can_merge(left, right)) state.merge(left, right)
    }
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
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
      this.set_for_cell[cell.get_id()] = set
      this.cells_in_set[set] = [cell]

      if (cell.south) this.neighbors.push([cell, cell.south])
      if (cell.east) this.neighbors.push([cell, cell.east])
    }
  }

  can_merge(left, right) {
    return this.set_for_cell[left.get_id()] != this.set_for_cell[right.get_id()]
  }

  merge(left, right) {
    left.link(right)

    const winner = this.set_for_cell[left.get_id()]
    const loser = this.set_for_cell[right.get_id()]
    const losers = this.cells_in_set[loser] || [right]
    if (winner == loser) return

    for (let i = 0; i < losers.length; i += 1) {
      const cell = losers[i]
      this.cells_in_set[winner].push(cell)
      this.set_for_cell[cell.get_id()] = winner
    }

    delete this.cells_in_set[loser]
  }

  add_crossing(cell) {
    if (cell.get_links().length > 0 ||
			!this.can_merge(cell.east, cell.west) ||
			!this.can_merge(cell.north, cell.south))
      return false

    // this.neighbors = this.neighbors.filter(c => c[0].get_id() != cell.get_id() && c[1].get_id() != cell.get_id() )

    if (Math.random() < 0.5) {
      if (cell.west.get_id() == cell.get_id() ||
				cell.get_id() == cell.east.get_id() ||
				cell.north.get_id() == cell.north.south.get_id() ||
				cell.south.get_id() == cell.south.north.get_id())
        return false

      this.neighbors = this.neighbors.filter(c => c[0].get_id() != cell.get_id() && c[1].get_id() != cell.get_id())

      this.merge(cell.west, cell)
      this.merge(cell, cell.east)

      this.grid.tunnel_under(cell)
      this.merge(cell.north, cell.north.south)
      this.merge(cell.south, cell.south.north)
    } else {
      if (cell.north.get_id() == cell.get_id() ||
				cell.get_id() == cell.south.get_id() ||
				cell.west.get_id() == cell.west.east.get_id() ||
				cell.east.get_id() == cell.east.west.get_id())
        return false

      this.neighbors = this.neighbors.filter(c => c[0].get_id() != cell.get_id() && c[1].get_id() != cell.get_id())

      this.merge(cell.north, cell)
      this.merge(cell, cell.south)

      this.grid.tunnel_under(cell)
      this.merge(cell.west, cell.west.east)
      this.merge(cell.east, cell.east.west)
    }

    return true
  }
}