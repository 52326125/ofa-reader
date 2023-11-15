export type NotificationType = 'progress' | 'description' | 'simple'

interface BaseNotification<T> {
  id: number
  cover?: string
  title: string
  type: NotificationType
  cancel?: () => void
  payload?: T
}

export interface SimpleNotification<T = object> extends BaseNotification<T> {
  type: 'simple'
}

export interface ProgressiveNotification<T = object>
  extends BaseNotification<T> {
  type: 'progress'
  progress: number
}

export interface DescriptionNotification<T = object>
  extends BaseNotification<T> {
  type: 'description'
  description: string
}

export type Notification<T = object> =
  | ProgressiveNotification<T>
  | DescriptionNotification<T>
  | SimpleNotification<T>

export interface CreationNotification<T = object>
  extends Omit<BaseNotification<T>, 'id'> {}
