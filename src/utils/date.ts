import { format } from 'date-fns'

export const formatSlash = (date: Date | undefined) => {
  if (!date) return '-'
  return format(date, 'yyyy/MM/dd')
}
