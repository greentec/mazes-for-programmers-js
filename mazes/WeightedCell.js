import Cell from './Cell.js'
import Distances from './Distances.js'

export default class WeightedCell extends Cell {
  constructor(row, column) {
    super(row, column)
    this.weight = 1
  }

  get distances() {
    const weights = new Distances(this)
    const pending = [this]

    while (pending.length > 0) {
      pending.sort((a, b) => weights.get(a) - weights.get(b))
      const cell = pending.shift()

      for (const link in cell.links) {
        const neighbor = cell.links[link]
        const total_weight = weights.get(cell) + neighbor.weight
        if (!weights.get(neighbor) || total_weight < weights.get(neighbor)) {
          pending.push(neighbor)
          weights.set_cell(neighbor, total_weight)
        }
      }
    }

    weights.set_cell(this, 0)
    return weights
  }
}