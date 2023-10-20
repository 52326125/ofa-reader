import { db } from '@/utils/db'
import { v4 } from 'uuid'

const { primary } = db

export const primaryTable = {
  get: async () => primary.toArray(),
  add: async (title: string) => primary.add({ uid: v4(), title })
}
