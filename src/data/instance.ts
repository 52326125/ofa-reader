import { db } from '@/utils/db'
import { v4 } from 'uuid'

const { instance } = db

export const primaryTable = {
  get: async (uid: string) => instance.get(uid),
  add: async (epub: Blob) => instance.add({ uid: v4(), epub })
}
