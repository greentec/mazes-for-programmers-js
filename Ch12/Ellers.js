"use strict";

class Ellers {
	on(grid) {
		let row_state = new RowState()

		let row_gen = grid.each_row()
		for (let i = 0; i < grid.rows; i += 1) {
			let row = row_gen.next().value
			for (let j = 0; j < row.length; j += 1) {
				let cell = row[j]
				if (!cell.west) continue

				let set = row_state.set_for(cell)
				let prior_set = row_state.set_for(cell.west)

				let should_link = set != prior_set && (cell.south == null || Math.random() < 0.5)
				if (should_link) {
					cell.link(cell.west)
					row_state.merge(prior_set, set)
				}
			}

			if (row[0].south) {
				let next_row = row_state.next()

				let each_set_gen = row_state.each_set()
				while (true) {
					let set, list
					let next = each_set_gen.next()
					if (next.done == true) break
					[set, list] = next.value
					if (!set) break
					if (!list || list.length == 0) break

					this.shuffle(list)
					for (let index = 0; index < list.length; index += 1) {
						let cell = list[index]
						if (index == 0 || Math.random() < 0.33) {
							cell.link(cell.south)
							next_row.record(row_state.set_for(cell), cell.south)
						}
					}
				}

				row_state = next_row
			}
		}
	}

	shuffle(array) {
		for (let i = array.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1))
			let temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}
	}
}

class RowState {
	constructor(starting_set=0) {
		this.cells_in_set = {}
		this.set_for_cell = []
		this.next_set = starting_set
	}

	record(set, cell) {
		this.set_for_cell[cell.column] = set

		if (!this.cells_in_set.hasOwnProperty(set)) this.cells_in_set[set] = []
		this.cells_in_set[set].push(cell)
	}

	set_for(cell) {
		if (!this.set_for_cell[cell.column]) {
			this.record(this.next_set, cell)
			this.next_set += 1
		}

		return this.set_for_cell[cell.column]
	}

	merge(winner, loser) {
		for (let i = 0; i < this.cells_in_set[loser].length; i += 1) {
			let cell = this.cells_in_set[loser][i]
			this.set_for_cell[cell.column] = winner
			this.cells_in_set[winner].push(cell)
		}

		delete this.cells_in_set[loser]
	}

	next() {
		return new RowState(this.next_set)
	}

	* each_set() {
		for (let [set, cells] of Object.entries(this.cells_in_set)) {
			yield [set, cells]
		}
		
	}
}