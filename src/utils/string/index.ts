import { formatSlash } from '../date'

export const display = (str: string | undefined) => (str ? str : '-')

export const displayDate = (date: Date | undefined) =>
  display(formatSlash(date))
