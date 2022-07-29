import RowState from './RowState.js'

export default class Ellers {
  on(grid) {
    let row_state = new RowState()
    const row_gen = grid.each_row()

    for (let i = 0; i < grid.rows; i += 1) {
      const row = row_gen.next().value
      for (let j = 0; j < row.length; j += 1) {
        const cell = row[j]
        if (!cell.west) continue

        const set = row_state.set_for(cell)
        const prior_set = row_state.set_for(cell.west)

        const should_link = set != prior_set && (cell.south == null || Math.random() < 0.5)
        if (should_link) {
          cell.link(cell.west)
          row_state.merge(prior_set, set)
        }
      }

      if (row[0].south) {
        const next_row = row_state.next()
        const each_set_gen = row_state.each_set()

        while (true) {
          let set, list
          const next = each_set_gen.next()
          if (next.done == true) break;
          [set, list] = next.value
          if (!set) break
          if (!list || list.length == 0) break

          this.shuffle(list)
          for (let index = 0; index < list.length; index += 1) {
            const cell = list[index]
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
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }
}
