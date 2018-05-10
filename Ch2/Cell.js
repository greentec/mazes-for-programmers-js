"use strict";

class Cell {
	constructor(row, column) {
		this.row = row
		this.column = column
		this.links = {}
		this.north = null
		this.south = null
		this.east = null
		this.west = null
	}

	link(cell, bidi=true) {
		this.links[cell.row + '#' + cell.column] = true
		if (bidi) cell.link(this, false)
	}
	
	unlink(cell, bidi=true) {
		delete this.links[cell.row + '#' + cell.column]
		if (bidi) cell.unlink(this, false)
	}
	
	links() {
		return Object.keys(this.links)
	}

	isLinked(cell) {
		return this.links.hasOwnProperty(cell.row + '#' + cell.column)
	}

	neighbors() {
		let list = []
		if (this.north) list.push(this.north)
		if (this.south) list.push(this.south)
		if (this.east) list.push(this.east)
		if (this.west) list.push(this.west)
		return list
	}
}