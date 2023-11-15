import { format } from 'date-fns'

export const formatDate = (
  date: Date | undefined,
  formatStr: string = 'yyyy/MM/dd'
) => {
  if (!date) return '-'
  return format(date, formatStr)
}
