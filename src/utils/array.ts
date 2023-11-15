export const mergeStringArray = (...arrays: string[][]) => {
  const mergeSet = new Set<string>()
  for (const arr of arrays) {
    for (const item of arr) {
      mergeSet.add(item)
    }
  }
  return Array.from(mergeSet)
}
