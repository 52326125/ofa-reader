import Epub, { Book, type NavItem } from 'epubjs'
import { bookFileTable } from '@/data/indexedDB/bookFile'

const flatChapter = (chapter: NavItem): NavItem[] => {
  if (!chapter.subitems || !chapter.subitems.length) return [chapter]

  let chapters: NavItem[] = [chapter]
  chapter.subitems.map((subitem) => {
    chapters = chapters.concat(flatChapter(subitem))
  })

  return chapters
}

export const analyzeEpub = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const epub = Epub(arrayBuffer)
  return { arrayBuffer, epub }
}

export const getChapters = async (epub: Book) => {
  const navigation = await epub.loaded.navigation
  let chapters: NavItem[] = []

  navigation.forEach((chapter) => {
    chapters = chapters.concat(flatChapter(chapter))
    return {}
  })

  return chapters
}

export const getBookData = async (uid: string) => {
  const localFile = await bookFileTable.get(uid)

  if (!localFile) throw new Error()

  const { epub } = await analyzeEpub(localFile.epub)
  const chapters = await getChapters(epub)

  return { epub, chapters }
}
