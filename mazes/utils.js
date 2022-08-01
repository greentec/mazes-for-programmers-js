export const lightGreenFill = (maximum, distance) => {
  const intensity = (maximum - distance) / maximum
  const dark = Math.floor(255 * intensity)
  const bright = Math.floor(128 + 127 * intensity)
  return `rgb(${dark},${bright},${dark})`
}

export const darkGreenFill = (maximum, distance) => {
  const intensity = 64 + 191 * (maximum - distance) / maximum
  return `rgb(${intensity},${intensity},0)`
}