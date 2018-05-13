"use strict"

class ColoredGrid extends Grid {
	constructor(rows, columns) {
		super(rows, columns)
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

		let cell_gen = this.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break

			let x1 = cell.column * cellSize
			let y1 = cell.row * cellSize
			let x2 = (cell.column + 1) * cellSize
			let y2 = (cell.row + 1) * cellSize

			ctx.fillStyle = this.background_color_for(cell)
			ctx.fillRect(x1, y1, cellSize, cellSize)

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