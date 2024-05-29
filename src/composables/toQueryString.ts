const toQueryString = (pairObject: object) => {
  let queryString = ''
  let i = 0
  for (const [key, value] of Object.entries(pairObject)) {
    if (value) {
      if (i === 0) {
        queryString += `?${key}=${value}`
      } else {
        queryString += `&${key}=${value}`
      }
      i++
    }
  }
  return queryString
}

export { toQueryString }
