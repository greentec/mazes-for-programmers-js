class SimplifiedPrims {
	on(grid, start_at=grid.get_random_cell()) {
		let active = []
		active.push(start_at)

		while (active.length > 0) {
			let cell = active[Math.floor(Math.random() * active.length)]
			let available_neighbors = cell.neighbors().filter(c => c.get_links().length == 0)

			if (available_neighbors.length > 0) {
				let neighbor = available_neighbors[Math.floor(Math.random() * available_neighbors.length)]
				cell.link(neighbor)
				active.push(neighbor)
			}
			else {
				active = active.filter(c => c.get_id() != cell.get_id())
			}
		}
	}
}

class TruePrims {
	on(grid, start_at=grid.get_random_cell()) {
		let active = []
		active.push(start_at)

		let costs = {}
		let cell_gen = grid.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break
			costs[cell.get_id()] = Math.floor(Math.random() * 100)
		}

		while (active.length > 0) {
			active.sort((a, b) => costs[a.get_id()] - costs[b.get_id()])
			let cell = active[0]
			let available_neighbors = cell.neighbors().filter(c => c.get_links().length == 0)

			if (available_neighbors.length > 0) {
				available_neighbors.sort((a, b) => costs[a.get_id()] - costs[b.get_id()])
				let neighbor = available_neighbors[0]
				cell.link(neighbor)
				active.push(neighbor)
			}
			else {
				active = active.filter(c => c.get_id() != cell.get_id())
			}
		}
	}
}