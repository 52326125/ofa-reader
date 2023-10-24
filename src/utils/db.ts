import type { Book } from '@/interface/book'
import Dexie, { type Table } from 'dexie'

export interface Primary {
  uid: string
  title: string
  cover?: Blob
}

export interface Instance {
  uid: string
  epub: File
}

export type BookMetadata = Omit<Book, 'uid' | 'type' | 'cover'>

export interface Metadata {
  uid: string
  data: BookMetadata
}

export class OfaReaderDB extends Dexie {
  primary!: Table<Primary>
  instance!: Table<Instance>
  metadata!: Table<Metadata>

  constructor() {
    super('OfaReaderDB')

    this.version(1).stores({
      primary: '&uid, title',
      instance: '&uid',
      metadata: '&uid, data'
    })
  }
}

export const db = new OfaReaderDB()
