class RecursiveBacktracker {
	on(grid, start_at = grid.get_random_cell()) {
		let stack = [start_at]

		while (stack.length > 0) {
			let current = stack[stack.length - 1]
			let neighbors = current.neighbors().filter(cell => cell.get_links().length == 0)

			if (neighbors.length == 0) {
				stack.pop()
			}
			else {
				let neighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
				current.link(neighbor)
				stack.push(neighbor)
			}
		}
	}
}