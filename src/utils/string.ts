import { v4 } from 'uuid'

export const formatNullableString = (str: string | undefined) => str || '-'

export const generateUuidV4 = () => v4()
