import { db } from '@/utils/db'
import { v4 } from 'uuid'

const { instance } = db

export const instanceTable = {
  get: async (uid: string) => instance.get(uid),
  add: async (epub: File) => instance.add({ uid: v4(), epub })
}
