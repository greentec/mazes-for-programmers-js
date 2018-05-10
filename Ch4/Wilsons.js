class Wilsons {
	on(grid) {
		let unvisited = []
		let cell_gen = grid.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break
			unvisited.push(cell)
		}

		let first = unvisited[Math.floor(Math.random() * unvisited.length)]
		unvisited = unvisited.filter(cell => cell.get_id() !== first.get_id())
		
		while (unvisited.length > 0) {
			let cell = unvisited[Math.floor(Math.random() * unvisited.length)]
			let path = [cell]

			while (unvisited.some(x => x.get_id() === cell.get_id())) {
				let neighbors = cell.neighbors()
				cell = neighbors[Math.floor(Math.random() * neighbors.length)]
				let position = path.findIndex(x => x.get_id() === cell.get_id())
				if (position != -1) {
					path = path.slice(0, position + 1)
				}
				else {
					path.push(cell)
				}
			}

			for (let i = 0; i <= path.length - 2; i += 1) {
				path[i].link(path[i + 1])
				unvisited = unvisited.filter(cell => cell.get_id() !== path[i].get_id())
			}
		}
	}
}