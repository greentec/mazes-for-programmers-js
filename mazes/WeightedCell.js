import Cell from './Cell.js'
import Distances from './Distances.js'

export default class WeightedCell extends Cell {
  constructor(row, column) {
    super(row, column)
    this.weight = 1
  }

  distances() {
    const weights = new Distances(this)
    const pending = [this]

    while (pending.length > 0) {
      pending.sort((a, b) => weights.get_cell(a) - weights.get_cell(b))
      const cell = pending.shift()

      for (const link in cell.links) {
        const neighbor = cell.links[link]
        const total_weight = weights.get_cell(cell) + neighbor.weight
        if (!weights.get_cell(neighbor) || total_weight < weights.get_cell(neighbor)) {
          pending.push(neighbor)
          weights.set_cell(neighbor, total_weight)
        }
      }
    }

    weights.set_cell(this, 0)
    return weights
  }
}