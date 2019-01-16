interface callback {
  (item: any, key?: string, hash?: object): any
}
interface reduceCallback {
  (accumulator: any, item: any, key?: string, hash?: object): any
}

export const hEach = (hash: object, func: callback): void => {
  for (const key in hash) {
    if (hash.hasOwnProperty(key)) {
      if (func(hash[key], key, hash) === false) {
        break
      }
    }
  }
}

export const hMap = (h: object, func: callback): object => {
  const temp = {}
  hEach(h, (item, key, hash) => {
    temp[key] = func(item, key, hash)
  })
  return temp
}

export const hFilter = (h: object, func: callback): object => {
  const temp = {}
  hEach(h, (item, key, hash) => {
    if (func(item, key, hash)) {
      temp[key] = item
    }
  })
  return temp
}

export const hReduce = (
  h: object,
  func: reduceCallback,
  initialValue: any
): object => {
  let accumulator = initialValue
  hEach(h, (item, key, hash) => {
    accumulator = func(accumulator, item, key, hash)
  })
  return accumulator
}

const hash = {
  a: 1,
  b: 2,
  c: 3,
}
// hEach(hash, (item, key, hash) => {
//   console.log('​item,key,hash', item, key, hash)
// })

// let result = hMap(hash, (item, index) => {
//   return item + index
// })
// let result = hFilter(hash, (item, index) => {
//   return index == 'b'
// })
// let result = hReduce(
//   hash,
//   (accumulator, item, key) => {
//     return accumulator + item
//   },
//   0
// )
// console.log('​result', result)
