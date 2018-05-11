"use strict"

class TriangleGrid extends Grid {
	constructor(rows, columns) {
		super(rows, columns)
	}

	prepare_grid() {
		this.grid = new Array(this.rows)
		for (let i = 0; i < this.rows; i += 1) {
			this.grid[i] = new Array(this.columns)
			for (let j = 0; j < this.columns; j += 1) {
				this.grid[i][j] = new TriangleCell(i, j)
			}
		}
	}

	configure_cells() {
		for (let i = 0; i < this.rows; i += 1) {
			for (let j = 0; j < this.columns; j += 1) {
				let cell = this.get_cell(i, j)
				if (cell == null) continue
				let row = cell.row
				let col = cell.column

				cell.west = this.get_cell(row, col-1)
				cell.east = this.get_cell(row, col+1)
				if (cell.isUpright()) {
					cell.south = this.get_cell(row+1, col)
				}
				else {
					cell.north = this.get_cell(row-1, col)
				}
			}
		}
	}

	to_img(ctx, cellSize=16) {
		ctx.strokeStyle = 'black'

		let half_width = cellSize / 2.0
		let height = cellSize * Math.sqrt(3) / 2.0
		let half_height = height / 2.0

		let img_width = Math.floor(cellSize * (this.columns + 1) / 2.0)
		let img_height = Math.floor(height * this.rows)

		let cell_gen = this.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break

			let cx = half_width + cell.column * half_width
			let cy = half_height + cell.row * height

			let west_x = Math.floor(cx - half_width)
			let mid_x = Math.floor(cx)
			let east_x = Math.floor(cx + half_width)

			let apex_y
			let base_y

			if (cell.isUpright()) {
				apex_y = Math.floor(cy - half_height)
				base_y = Math.floor(cy + half_height)
			}
			else {
				apex_y = Math.floor(cy + half_height)
				base_y = Math.floor(cy - half_height)
			}

			if (!cell.west) {
				ctx.moveTo(west_x, base_y)
				ctx.lineTo(mid_x, apex_y)
				ctx.stroke()
			}
			if ((cell.east && !cell.isLinked(cell.east)) || !cell.east) {
				ctx.moveTo(east_x, base_y)
				ctx.lineTo(mid_x, apex_y)
				ctx.stroke()
			}

			let no_south = cell.isUpright() && cell.south == null
			let not_linked = !cell.isUpright() && ((cell.north && !cell.isLinked(cell.north)) || !cell.north)

			if (no_south || not_linked) {
				ctx.moveTo(east_x, base_y)
				ctx.lineTo(west_x, base_y)
				ctx.stroke()
			}
		}
	}
}