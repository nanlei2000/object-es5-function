interface EachCallback<T extends object> {
  (value: T[Extract<keyof T, string>], key: Extract<keyof T, string>, hash: T):
    | false
    | void
}
interface MapCallback<T extends object, K extends any> {
  (
    value: T[Extract<keyof T, string>],
    key: Extract<keyof T, string>,
    hash: T
  ): K
}
interface FilterCallback<T extends object> {
  (
    value: T[Extract<keyof T, string>],
    key: Extract<keyof T, string>,
    hash: T
  ): boolean
}
interface ReduceCallback<T extends object, K> {
  (
    accumulator: K,
    value: T[Extract<keyof T, string>],
    key: Extract<keyof T, string>,
    hash: T
  ): K
}
type ValueTypeMapped<T extends object, K> = { [p in keyof T]: K }
/**
 * 遍历对象,`return false`跳出,可以通过`hash[key]`的方式修改对象
 */
export function hEach<T extends object>(
  hash: T,
  func: EachCallback<T>
): void {
  for (const key in hash) {
    if (hash.hasOwnProperty(key)) {
      if (func(hash[key], key, hash) === false) {
        break
      }
    }
  }
}

/**
 * 对对象进行值映射,返回新的对象
 */
export function hMap<T extends object, K>(
  hash: T,
  func: MapCallback<T, K>
): ValueTypeMapped<T, K> {
  const temp = {} as ValueTypeMapped<T, K>
  hEach(hash, (value, key, h) => {
    temp[key] = func(value, key, h)
  })
  return temp
}
/**
 * 过滤对象,返回新的对象
 */
export function hFilter<T extends object>(h: T, func: FilterCallback<T>): Partial<T> {
  const temp = {} as Partial<T>
  hEach(h, (value, key, hash) => {
    if (func(value, key, hash)) {
      temp[key] = value
    }
  })
  return temp
}
/**
 * 对对象进行值的归并
 */
export function hReduce<T extends object, K>(
  hash: T,
  func: ReduceCallback<T, K>,
  initialValue: K
): K {
  let accumulator = initialValue
  hEach(hash, (value, key, h) => {
    accumulator = func(accumulator, value, key, h)
  })
  return accumulator
}
