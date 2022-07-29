import State from './State.js'

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
