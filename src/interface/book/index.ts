export * from './reader'

export type BookType = 'local' | 'remote' | 'both'

export interface Book {
  uid: string
  title: string
  description?: string
  creator?: string
  publisher?: string
  pubdate?: Date
  language?: string
  cover?: string
  type: BookType
  lastTime?: Date
}

export interface BookLoadingPayload {
  bookId: number
  progress: number
}

export interface AddBook {
  title: string
  cover: string
}
