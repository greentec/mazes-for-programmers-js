"use strict";

class TriangleCell extends Cell {
	constructor(row, column) {
		super(row, column)
	}

	isUpright() {
		return (this.row + this.column) % 2 == 0
	}

	neighbors() {
		let list = []
		if (this.west)						 list.push(this.west)
		if (this.east)						 list.push(this.east)
		if (!this.isUpright() && this.north) list.push(this.north)
		if (this.isUpright() && this.south)	 list.push(this.south)
		return list
	}
}