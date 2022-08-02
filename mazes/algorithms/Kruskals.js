import State from './State.js'

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export default class Kruskals {
  static on(grid, state = new State(grid)) {
    shuffle(state.neighbors)

    while (state.neighbors.length) {
      const [left, right] = state.neighbors.pop()
      if (state.can_merge(left, right)) state.merge(left, right)
    }
  }
}
