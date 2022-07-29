export default class SideWinder {
  on(grid) {
    const row_gen = grid.each_row()
    while (true) {
      const row = row_gen.next().value
      if (!row) break

      let run = []
      for (let j = 0; j < row.length; j += 1) {
        const cell = row[j]
        run.push(cell)

        const at_eastern_boundary = cell.east == null
        const at_northern_boundary = cell.north == null
        const should_close_out = at_eastern_boundary || (!at_northern_boundary && Math.random() < 0.5)

        if (should_close_out) {
          const member = run[Math.floor(Math.random() * run.length)]
          if (member.north) member.link(member.north)
          run = []
        } else
          cell.link(cell.east)
      }
    }
  }
}