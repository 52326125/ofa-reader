import { db, type Primary } from '@/utils/db'
import { v4 } from 'uuid'

const { primary } = db

export const primaryTable = {
  get: async () => primary.toArray(),
  add: async ({ title, cover }: Omit<Primary, 'uid'>) =>
    primary.add({ uid: v4(), title: title, cover: cover })
}
