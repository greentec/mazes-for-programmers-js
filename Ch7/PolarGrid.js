"use strict"

class PolarGrid extends Grid {
	constructor(rows, columns) {
		super(rows, 1)
	}

	prepare_grid() {
		let rows = new Array(this.rows)

		let row_height = 1.0 / this.rows
		rows[0] = [new PolarCell(0, 0)]
		
		for (let i = 1; i <= this.rows; i += 1) {
			let radius = i * 1.0 / this.rows
			let circumference = 2 * Math.PI * radius

			let previous_count = rows[i - 1].length
			let estimated_cell_width = circumference / previous_count
			let ratio = Math.round(estimated_cell_width / row_height)

			let cells = previous_count * ratio
			rows[i] = new Array(cells)
			for (let j = 0; j < cells; j += 1) {
				rows[i][j] = new PolarCell(i, j)
			}
		}

		this.grid = rows
	}

	configure_cells() {
		let cell_gen = this.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break

			let row = cell.row
			let col = cell.column

			if (row > 0) {
				cell.cw  = this.get_cell(row, col + 1)
				cell.ccw = this.get_cell(row, col - 1)

				let ratio = this.grid[row].length / this.grid[row-1].length
				let parent = this.grid[row-1][Math.floor(col/ratio)]
				parent.outward.push(cell)
				cell.inward = parent
			}

		}
	}

	get_cell(row, column) {
		if (row < 0 || row > this.rows - 1) 		 return null
		// if (column < 0 || column > this.grid[row].length) return null
		return this.grid[row][column % this.grid[row].length]
	}

	get_random_cell() {
		let row = Math.floor(Math.random() * this.rows)
		let col = Math.floor(Math.random() * this.grid[row].length)

		return this.get_cell(row, col)
	}

	to_img(ctx, cellSize=10) {
		ctx.strokeStyle = 'black'

		let img_size = 2 * this.rows * cellSize
		let center = img_size / 2

		let cell_gen = this.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break
			if (cell.row == 0) continue

			let theta 		 = 2 * Math.PI / this.grid[cell.row].length
			let inner_radius = cell.row * cellSize
			let outer_radius = (cell.row + 1) * cellSize
			let theta_ccw	 = cell.column * theta
			let theta_cw	 = (cell.column + 1) * theta

			let ax = center + Math.floor(inner_radius * Math.cos(theta_ccw))
			let ay = center + Math.floor(inner_radius * Math.sin(theta_ccw))
			let bx = center + Math.floor(outer_radius * Math.cos(theta_ccw))
			let by = center + Math.floor(outer_radius * Math.sin(theta_ccw))
			let cx = center + Math.floor(inner_radius * Math.cos(theta_cw))
			let cy = center + Math.floor(inner_radius * Math.sin(theta_cw))
			let dx = center + Math.floor(outer_radius * Math.cos(theta_cw))
			let dy = center + Math.floor(outer_radius * Math.sin(theta_cw))

			if ((cell.inward && !cell.isLinked(cell.inward)) || !cell.inward) {
				ctx.moveTo(ax, ay)
				ctx.lineTo(cx, cy)
				ctx.stroke()
			}
			if ((cell.cw && !cell.isLinked(cell.cw)) || !cell.cw) {
				ctx.moveTo(cx, cy)
				ctx.lineTo(dx, dy)
				ctx.stroke()
			}
		}

		ctx.arc(center, center, this.rows * cellSize, 0, 2 * Math.PI)
		ctx.stroke()
	}
}