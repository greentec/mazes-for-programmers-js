class SideWinder {
	on(grid) {
		let row_gen = grid.each_row()
		while (true) {
			let row = row_gen.next().value
			if (!row) break

			let run = []
			for (let j = 0; j < row.length; j += 1) {
				let cell = row[j]
				run.push(cell)

				let at_eastern_boundary  = cell.east == null
				let at_northern_boundary = cell.north == null

				let should_close_out = at_eastern_boundary || (!at_northern_boundary && Math.random() < 0.5)

				if (should_close_out) {
					let member = run[Math.floor(Math.random() * run.length)]
					if (member.north) member.link(member.north)
					run = []
				}
				else {
					cell.link(cell.east)
				}
			}
		}
	}
}