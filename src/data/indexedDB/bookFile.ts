import { db, type BookFile } from '@/utils/db'

const { bookFile } = db

export const bookFileTable = {
  get: async (uid: string) => await bookFile.get(uid),
  add: async (_bookFile: BookFile) => await bookFile.add(_bookFile)
}
