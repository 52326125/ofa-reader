import type { Book } from '@/interface/book'
import Dexie, { type Table } from 'dexie'

export interface Primary {
  uid: string
  title: string
}

export interface Instance {
  uid: string
  epub: Blob
}

export type BookMetadata = Omit<Book, 'id' | 'type' | 'cover'>

export interface Metadata {
  uid: string
  data: BookMetadata
}

export interface Cover {
  uid: string
  data: Blob
}

// cover 與 primary 合併

export class OfaReaderDB extends Dexie {
  primary!: Table<Primary>
  instance!: Table<Instance>
  metadata!: Table<Metadata>
  cover!: Table<Cover>

  constructor() {
    super('OfaReaderDB')

    this.version(1).stores({
      primary: '&uid, title',
      instance: '&uid',
      metadata: '&uid, data',
      cover: '&uid'
    })
  }
}

export const db = new OfaReaderDB()
