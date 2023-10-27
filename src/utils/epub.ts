import Epub from 'epubjs'

export const analyzeEpub = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const epub = Epub(arrayBuffer)
  return { arrayBuffer, epub }
}
