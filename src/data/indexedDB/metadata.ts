import { db, type Metadata } from '@/utils/db'

const { metadata } = db

export const metadataTable = {
  get: async (uid: string) => await metadata.get(uid),
  add: async (data: Metadata) => await metadata.add(data)
}
