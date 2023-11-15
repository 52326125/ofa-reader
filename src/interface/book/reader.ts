export type ReaderSettingValue = string | boolean | number

export type ReaderSettingKey =
  | 'contents'
  | 'fontFamily'
  | 'lineHeight'
  | 'displayMode'
  | 'pageWidth'

export type ReaderSetting = Record<ReaderSettingKey, ReaderSettingValue>
