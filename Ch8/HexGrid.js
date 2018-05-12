"use strict"

class HexGrid extends Grid {
	constructor(rows, columns) {
		super(rows, columns)
	}

	prepare_grid() {
		this.grid = new Array(this.rows)
		for (let i = 0; i < this.rows; i += 1) {
			this.grid[i] = new Array(this.columns)
			for (let j = 0; j < this.columns; j += 1) {
				this.grid[i][j] = new HexCell(i, j)
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

				let north_diagonal
				let south_diagonal
				if (col % 2 == 0) {
					north_diagonal = row - 1
					south_diagonal = row
				}
				else {
					north_diagonal = row
					south_diagonal = row + 1
				}

				cell.northwest = this.get_cell(north_diagonal, col-1)
				cell.north 	   = this.get_cell(row-1, col)
				cell.northeast = this.get_cell(north_diagonal, col+1)
				cell.southwest = this.get_cell(south_diagonal, col-1)
				cell.south 	   = this.get_cell(row+1, col)
				cell.southeast = this.get_cell(south_diagonal, col+1)
			}
		}
	}

	get_cell(row, column) {
		if (row < 0 || row > this.rows - 1) 		 return null
		if (column < 0 || column > this.columns - 1) return null
		return this.grid[row][column]
	}

	set_distances(distances) {
		this.distances = distances
		let farthest_id
		[farthest_id, this.maximum] = distances.max()
	}

	background_color_for(cell) {
		let distance = this.distances.get_cell(cell)
		let intensity = (this.maximum - distance) * 1.0 / this.maximum
		let dark = Math.floor(255 * intensity)
		let bright = Math.floor(128 + 127 * intensity)
		return `rgb(${dark},${bright},${dark})`
	}

	to_img(ctx, cellSize) {
		ctx.strokeStyle = 'black'

		let a_size = cellSize / 2.0
		let b_size = cellSize * Math.sqrt(3) / 2.0
		let width = cellSize * 2
		let height = b_size * 2

		let img_width = Math.floor(3 * a_size * this.columns + a_size + 0.5)
		let img_height = Math.floor(height * this.rows + b_size + 0.5)

		let cell_gen = this.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break

			let cx = cellSize + 3 * cell.column * a_size
			let cy = b_size + cell.row * height
			if (cell.column % 2 == 1) cy += b_size

			let x_fw = Math.floor(cx - cellSize)
			let x_nw = Math.floor(cx - a_size)
			let x_ne = Math.floor(cx + a_size)
			let x_fe = Math.floor(cx + cellSize)

			let y_n = Math.floor(cy - b_size)
			let y_m = Math.floor(cy)
			let y_s = Math.floor(cy + b_size)

			if (this.distances) {
				ctx.beginPath()
				ctx.fillStyle = this.background_color_for(cell)
				let p = new Path2D(`M ${x_fw} ${y_m} L ${x_nw} ${y_n} L ${x_ne} ${y_n} L ${x_fe} ${y_m} L ${x_ne} ${y_s} L ${x_nw} ${y_s} Z`)
				ctx.fill(p)
				ctx.closePath()
			}

			if (!cell.southwest) {
				ctx.moveTo(x_fw, y_m)
				ctx.lineTo(x_nw, y_s)
				ctx.stroke()
			}
			if (!cell.northwest) {
				ctx.moveTo(x_fw, y_m)
				ctx.lineTo(x_nw, y_n)
				ctx.stroke()
			}
			if (!cell.north) {
				ctx.moveTo(x_nw, y_n)
				ctx.lineTo(x_ne, y_n)
				ctx.stroke()
			}
			if ((cell.northeast && !cell.isLinked(cell.northeast)) || !cell.northeast) {
				ctx.moveTo(x_ne, y_n)
				ctx.lineTo(x_fe, y_m)
				ctx.stroke()
			}
			if ((cell.southeast && !cell.isLinked(cell.southeast)) || !cell.southeast) {
				ctx.moveTo(x_fe, y_m)
				ctx.lineTo(x_ne, y_s)
				ctx.stroke()
			}
			if ((cell.south && !cell.isLinked(cell.south)) || !cell.south) {
				ctx.moveTo(x_ne, y_s)
				ctx.lineTo(x_nw, y_s)
				ctx.stroke()
			}
		}
	}
}