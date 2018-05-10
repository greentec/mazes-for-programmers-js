class BinaryTree {
	on(grid) {
		let cell_gen = grid.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break

			let neighbors = []
			if (cell.north) neighbors.push(cell.north)
			if (cell.east) neighbors.push(cell.east)

			let index = Math.floor(Math.random() * neighbors.length)
			let neighbor = neighbors[index]

			if (neighbor) cell.link(neighbor)
		}
	}
}