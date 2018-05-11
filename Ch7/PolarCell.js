"use strict";

class PolarCell extends Cell {
	constructor(row, column) {
		super(row, column)
		this.outward = []
		
		this.cw = null
		this.ccw = null
		this.inward = null
	}

	neighbors() {
		let list = []
		if (this.cw)	 list.push(this.cw)
		if (this.ccw)	 list.push(this.ccw)
		if (this.inward) list.push(this.inward)
		list.push(...this.outward)
		return list
	}

	get_id() {
		return this.row + '#' + this.column
	}
}