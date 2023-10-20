import { db, type BookMetadata } from '@/utils/db'
import { v4 } from 'uuid'

const { metadata } = db

export const primaryTable = {
  get: async (uid: string) => metadata.get(uid),
  add: async (data: BookMetadata) => metadata.add({ uid: v4(), data })
}
