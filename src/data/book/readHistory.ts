import type { ReadHistory } from '@/interface/book'
import { READ_HISTORY } from '@/data/localStorage'

export const getReadHistory = (): ReadHistory[] | null => {
  const readHistoryString = localStorage.getItem(READ_HISTORY)

  if (readHistoryString) return JSON.parse(readHistoryString)
  return null
}

export const getReadHistoryByUid = (uid: string) => {
  const readHistory = getReadHistory()

  if (readHistory) {
    return readHistory.find((history) => history.uid === uid) || null
  }
  return null
}

export const addReadHistory = (readHistory: ReadHistory) => {
  const { uid, href, idref } = readHistory
  const oldReadHistoryString = localStorage.getItem(READ_HISTORY)
  let newReadHistory: ReadHistory[] = []
  let newReadHistoryString = ''

  if (oldReadHistoryString) {
    const oldReadHistory: ReadHistory[] = JSON.parse(oldReadHistoryString)
    const findReadHistory = oldReadHistory.find(
      (history) => history.uid === uid
    )

    if (findReadHistory) {
      newReadHistory = oldReadHistory.map((history) => {
        if (history.uid === findReadHistory.uid) {
          return { ...history, href, idref }
        }
        return history
      })
    } else {
      newReadHistory = oldReadHistory.concat({ uid, href, idref })
    }
  } else {
    newReadHistory = [{ uid, href, idref }]
  }

  newReadHistoryString = JSON.stringify(newReadHistory)
  localStorage.setItem(READ_HISTORY, newReadHistoryString)

  return newReadHistory
}
