"use strict"

class MaskedGrid extends Grid {
	constructor(mask) {
		super(mask.rows, mask.columns)
		this.mask = mask

		// this.rows = rows
		// this.columns = columns

		this.prepare_grid()
		this.configure_cells()
	}

	prepare_grid() {
		if (!this.mask) return

		this.grid = new Array(this.rows)
		for (let i = 0; i < this.rows; i += 1) {
			this.grid[i] = new Array(this.columns)
			for (let j = 0; j < this.columns; j += 1) {
				if (this.mask.get_bits(i, j)) this.grid[i][j] = new Cell(i, j)
			}
		}
	}

	configure_cells() {
		if (!this.mask) return
		
		super.configure_cells()
	}

	get_random_cell() {
		let row, column
		[row, column] = this.mask.random_location()
		
		return this.get_cell(row, column)
	}

	size() {
		return this.mask.count()
	}
}