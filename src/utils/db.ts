import Dexie, { type Table } from 'dexie'
import type { Book } from '@/interface/book'

export interface BookIntro {
  uid: string
  title: string
  cover?: Blob
  md5: string
}

export interface BookFile {
  uid: string
  epub: File
}

export type BookMetadata = Omit<Book, 'uid' | 'type' | 'cover'>

export interface Metadata {
  uid: string
  data: BookMetadata
}

export class OfaReaderDB extends Dexie {
  bookIntro!: Table<BookIntro>
  bookFile!: Table<BookFile>
  metadata!: Table<Metadata>

  constructor() {
    super('OfaReaderDB')

    this.version(1).stores({
      bookIntro: '&uid, md5',
      bookFile: '&uid',
      metadata: '&uid'
    })
  }
}

export const db = new OfaReaderDB()
