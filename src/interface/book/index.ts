import type { Book as EpubBook, NavItem, Rendition } from 'epubjs'
import type { PackagingMetadataObject } from 'epubjs/types/packaging'
import type Spine from 'epubjs/types/spine'

type MetadataDirection = 'ltr' | 'rtl'

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

export interface SpineItem {
  index: number
  href: string
  idref: string
}

export interface EpubInfo {
  epub: EpubBook
  rendition: Rendition
  chapters: NavItem[]
  currentChapter: Omit<SpineItem, 'index'>
  currentNavChapter: NavItem
  pages: number
  direction: MetadataDirection
}

export interface ISpine extends Spine {
  items: SpineItem[]
}

export interface IPackagingMetadataObject extends PackagingMetadataObject {
  direction: MetadataDirection | null
}

export interface ReadHistory {
  uid: string
  href: string
  idref: string
}
