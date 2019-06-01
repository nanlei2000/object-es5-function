import { hEach, hMap, hFilter, hReduce } from './index'

const hash = {
  a: false,
  b: 2,
  c: "3",
}
hEach(hash, (item, key, hash) => {
  console.log('​item,key,hash', item, key, hash)
})

let result1 = hMap(hash, (item, key) => {
  return key === "a" ? item : item + key
})
type result1 = typeof result1

let result2 = hFilter(hash, (item, index) => {
  return index == 'b'
})
type result2 = typeof result2

let result3 = hReduce(
  hash,
  (accumulator, item, key) => {
    return accumulator + item
  },
  ''
)
console.log('​result1', result1)
console.log('​result2', result2)
console.log('​result3', result3)
