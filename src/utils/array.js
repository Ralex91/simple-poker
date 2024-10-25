export const arrayPick = (arr, pick) => {
  let sub = []
  let rest = []

  for (let index = 0; index < arr.length; index++) {
    const value = arr[index]
    if (index < pick) {
      sub = [...sub, value]
    } else {
      rest = [...rest, value]
    }
  }

  return { rest, sub }
}
