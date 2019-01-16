import { hEach, hMap, hFilter, hReduce } from './index'

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
