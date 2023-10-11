export type BookType = 'local' | 'remote' | 'both'

export interface Book {
  id: number
  title: string
  description: string
  creator: string
  publisher?: string
  pubdate?: Date
  language: string
  cover: string
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

export interface Chapter {
  id: number
  href: string
  label: string
  subItems?: Chapter[]
}
