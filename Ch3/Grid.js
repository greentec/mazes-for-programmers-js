"use strict"

class Grid {
	constructor(rows, columns) {
		this.rows = rows
		this.columns = columns

		this.prepare_grid()
		this.configure_cells()
	}

	prepare_grid() {
		this.grid = new Array(this.rows)
		for (let i = 0; i < this.rows; i += 1) {
			this.grid[i] = new Array(this.columns)
			for (let j = 0; j < this.columns; j += 1) {
				this.grid[i][j] = new Cell(i, j)
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
				if (row > 0) 		   cell.north = this.get_cell(row-1, col)
				if (row < this.rows-1) cell.south = this.get_cell(row+1, col)
				if (col > 0) 		   cell.west  = this.get_cell(row, col-1)
				if (col < this.columns-1) cell.east  = this.get_cell(row, col+1)
			}
		}
	}

	get_cell(row, column) {
		if (row < 0 || row > this.rows) 		 return null
		if (column < 0 || column > this.columns) return null
		return this.grid[row][column]
	}

	get_random_cell() {
		let row = Math.floor(Math.random() * this.rows)
		let column = Math.floor(Math.random() * this.grid[row].length)

		return this.get_cell(row, column)
	}

	size() {
		return this.rows * this.columns
	}

	* each_row() {
		for (let i = 0; i < this.rows; i += 1) {
			yield this.grid[i]
		}
	}

	* each_cell() {
		let row_gen = this.each_row()
		for (let i = 0; i < this.rows; i += 1) {
			let row = row_gen.next().value;
			for (let j = 0; j < row.length; j += 1) {
				yield row[j]
			}
		}
		
	}

	contents_of(cell) {
		return ' '
	}

	toString() {
		let output = ''
		output += '+' + '---+'.repeat(this.columns) + '\n'
		let row_gen = this.each_row()
		while (true) {
			let row = row_gen.next().value
			if (!row) break

			let top = '|'
			let bottom = '+'

			for (let j = 0; j < row.length; j += 1) {
				let cell = row[j]
				if (!cell) cell = new Cell(-1, -1)

				let body = '   '
				let east_boundary = (cell.east && cell.isLinked(cell.east)) ? ' ' : '|'
				top += body + east_boundary

				let south_boundary = (cell.south && cell.isLinked(cell.south)) ? '   ' : '---'
				let corner = '+'
				bottom += south_boundary + corner
			}

			output += top + '\n'
			output += bottom + '\n'
		}
		return output
	}

	to_img(ctx, cellSize) {
		ctx.strokeStyle = 'black'

		let cell_gen = this.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break

			let x1 = cell.column * cellSize
			let y1 = cell.row * cellSize
			let x2 = (cell.column + 1) * cellSize
			let y2 = (cell.row + 1) * cellSize

			if (!cell.north) {
				ctx.moveTo(x1, y1)
				ctx.lineTo(x2, y1)
				ctx.stroke()
			}
			if (!cell.west) {
				ctx.moveTo(x1, y1)
				ctx.lineTo(x1, y2)
				ctx.stroke()
			}
			if ((cell.east && !cell.isLinked(cell.east)) || !cell.east) {
				ctx.moveTo(x2, y1)
				ctx.lineTo(x2, y2)
				ctx.stroke()
			}
			if ((cell.south && !cell.isLinked(cell.south)) || !cell.south) {
				ctx.moveTo(x1, y2)
				ctx.lineTo(x2, y2)
				ctx.stroke()
			}
		}
	}
}