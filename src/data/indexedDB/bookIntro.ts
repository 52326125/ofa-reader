import { db, type BookIntro } from '@/utils/db'
import { generateUuidV4 } from '@/utils/string'

const { bookIntro } = db

export type AddBookIntro = Omit<BookIntro, 'uid'>

export const bookIntroTable = {
  get: async () => await bookIntro.toArray(),
  getByUid: async (uid: string) => await bookIntro.get(uid),
  add: async (intro: AddBookIntro) => {
    const uid = generateUuidV4()
    await bookIntro.add({ uid, ...intro })
    return uid
  }
}
