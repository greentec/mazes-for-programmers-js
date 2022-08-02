export const shadeOfGreen = (maximum, distance) => {
  const intensity = (maximum - distance) / maximum
  const dark = Math.floor(255 * intensity)
  const bright = Math.floor(128 + 127 * intensity)
  return `rgb(${dark},${bright},${dark})`
}

export const shadeOfYellow = (maximum, distance) => {
  const intensity = 64 + 191 * (maximum - distance) / maximum
  return `rgb(${intensity},${intensity},0)`
}

export const shuffle = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export const sample = arr => arr[Math.floor(Math.random() * arr.length)]
