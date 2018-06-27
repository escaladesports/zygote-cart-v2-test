function arrsAreEqual(arr1, arr2) {
  let value = true
  if (!arr1 || !arr2) {
    value = false
  }

  if (arr1.length !== arr2.length) {
    value = false
  }

  arr1.forEach(first => {
    arr2.forEach(second => {
      if (typeof first === 'object' || typeof second === 'object') {
        if (Array.isArray(first) || Array.isArray(second)) {
          value = arrsAreEqual(first, second)
          if (value === false) {
            return
          }
        }
        value = objsAreEqual(first, second)
        if (value === false) {
          return
        }
      }
      if (first !== second) {
        value = false
      }
    })
  })

  return value
}

function objsAreEqual(obj1, obj2) {
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  const obj1Values = Object.values(obj1)
  const obj2Values = Object.values(obj2)

  if (!arrsAreEqual(obj1Keys, obj2Keys)) {
    return false
  }
  if (!arrsAreEqual(obj1Values, obj2Values)) {
    return false
  }
  return true
}

export { arrsAreEqual, objsAreEqual }
