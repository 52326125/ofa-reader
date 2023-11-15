/// <reference types="vite/client" />

interface QueryLocalFontsResponse {
  family: string
  fullName: string
  postscriptName: string
  style: string
}

declare interface Window {
  queryLocalFonts: () => Promise<QueryLocalFontsResponse[]>
}
