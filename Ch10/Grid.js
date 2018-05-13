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
		if (row < 0 || row > this.rows - 1) 		 return null
		if (column < 0 || column > this.grid[row].length - 1) return null
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
				if (row[j]) yield row[j]
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

	to_img(ctx, cellSize=10, inset=0) {
		ctx.strokeStyle = 'black'

		inset = Math.floor(cellSize * inset)

		let cell_gen = this.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break

			let x = cell.column * cellSize
			let y = cell.row * cellSize

			if (inset > 0) {
				this.to_img_with_inset(ctx, cell, cellSize, x, y, inset)
			}
			else {
				this.to_img_without_inset(ctx, cell, cellSize, x, y)
			}
		}
	}

	to_img_without_inset(ctx, cell, cellSize, x, y) {
		let x1 = x
		let y1 = y
		let x2 = x1 + cellSize
		let y2 = y1 + cellSize

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

	cell_coordinates_with_inset(x, y, cellSize, inset) {
		let x1 = x
		let x4 = x + cellSize
		let x2 = x1 + inset
		let x3 = x4 - inset

		let y1 = y
		let y4 = y + cellSize
		let y2 = y1 + inset
		let y3 = y4 - inset

		return [x1, x2, x3, x4, y1, y2, y3, y4]
	}

	to_img_with_inset(ctx, cell, cellSize, x, y, inset) {
		let x1, x2, x3, x4, y1, y2, y3, y4
		[x1, x2, x3, x4, y1, y2, y3, y4] = this.cell_coordinates_with_inset(x, y, cellSize, inset)

		if (cell.north && cell.isLinked(cell.north)) {
			ctx.moveTo(x2, y1)
			ctx.lineTo(x2, y2)
			ctx.moveTo(x3, y1)
			ctx.lineTo(x3, y2)
			ctx.stroke()
		}
		else {
			ctx.moveTo(x2, y2)
			ctx.lineTo(x3, y2)
			ctx.stroke()
		}
		if (cell.south && cell.isLinked(cell.south)) {
			ctx.moveTo(x2, y3)
			ctx.lineTo(x2, y4)
			ctx.moveTo(x3, y3)
			ctx.lineTo(x3, y4)
			ctx.stroke()
		}
		else {
			ctx.moveTo(x2, y3)
			ctx.lineTo(x3, y3)
			ctx.stroke()
		}
		if (cell.west && cell.isLinked(cell.west)) {
			ctx.moveTo(x1, y2)
			ctx.lineTo(x2, y2)
			ctx.moveTo(x1, y3)
			ctx.lineTo(x2, y3)
			ctx.stroke()
		}
		else {
			ctx.moveTo(x2, y2)
			ctx.lineTo(x2, y3)
			ctx.stroke()
		}
		if (cell.east && cell.isLinked(cell.east)) {
			ctx.moveTo(x3, y2)
			ctx.lineTo(x4, y2)
			ctx.moveTo(x3, y3)
			ctx.lineTo(x4, y3)
			ctx.stroke()
		}
		else {
			ctx.moveTo(x3, y2)
			ctx.lineTo(x3, y3)
			ctx.stroke()
		}
	}

	deadends() {
		let list = []

		let cell_gen = this.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break
			if (cell.get_links().length == 1) {
				list.push(cell)
			}
		}

		return list
	}

	shuffle(array) {
		for (let i = array.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1))
			let temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}
	}

	braid(p=1.0) {
		let deadends = this.deadends()
		this.shuffle(deadends)
		
		deadends.forEach(function(cell) {
			if (cell.get_links().length != 1 || Math.random() > p) {
				return
			}

			let neighbors = cell.neighbors().filter(c => !c.isLinked(cell))
			let best = neighbors.filter(c => c.get_links().length == 1)
			if (best.length == 0) best = neighbors

			let neighbor = best[Math.floor(Math.random() * best.length)]
			cell.link(neighbor)
		}, this)
	}
}