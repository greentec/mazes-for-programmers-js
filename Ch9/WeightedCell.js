"use strict";

class WeightedCell extends Cell {
	constructor(row, column) {
		super(row, column)
		this.weight = 1
	}

	distances() {
		let weights = new Distances(this)
		let pending = [this]

		while (pending.length > 0) {
			pending.sort((a, b) => weights.get_cell(a) - weights.get_cell(b))
			let cell = pending.shift()

			for (let link in cell.links) {
				let neighbor = cell.links[link]
				let total_weight = weights.get_cell(cell) + neighbor.weight
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