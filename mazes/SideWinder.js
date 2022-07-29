export default class SideWinder {
  on(grid) {
    for (const row of grid.each_row()) {
      let run = []
      for (const cell of row) {
        run.push(cell)

        const should_close_out = !cell.east || (cell.north && Math.random() < 0.5)

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