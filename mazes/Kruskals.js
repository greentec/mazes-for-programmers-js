import State from './State.js'

export default class Kruskals {

  static on(grid, state = new State(grid)) {
    const { neighbors } = state
    this.shuffle(neighbors)

    while (neighbors.length) {
      const [left, right] = neighbors.pop()
      if (state.can_merge(left, right)) state.merge(left, right)
    }
  }

  static shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }
}
