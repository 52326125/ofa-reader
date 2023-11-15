import { sendApiRequest, type ApiRequestOptions } from '@/utils/api/base'

interface BaseRequestOptions {
  withToken?: boolean
  useBackendUrl?: boolean
}

interface GetRequestOptions extends BaseRequestOptions {
  params?: object
}

export async function sendGetRequest(url: string, options?: GetRequestOptions) {
  const { withToken = true, useBackendUrl = true, params } = options ?? {}

  const apiRequestOptions: ApiRequestOptions = {
    url,
    withToken,
    useBackendUrl,
    params,
    method: 'get'
  }

  const response = await sendApiRequest(apiRequestOptions)
  return response.data
}

export async function sendPostRequest(
  url: string,
  payload?: object,
  options?: BaseRequestOptions
) {
  const { withToken = true, useBackendUrl = true } = options ?? {}

  const apiRequestOptions: ApiRequestOptions = {
    url,
    withToken,
    useBackendUrl,
    payload,
    method: 'post'
  }

  const response = await sendApiRequest(apiRequestOptions)
  return response.data
}

export async function sendPutRequest(
  url: string,
  payload?: object,
  options?: BaseRequestOptions
) {
  const { withToken = true, useBackendUrl = true } = options ?? {}

  const apiRequestOptions: ApiRequestOptions = {
    url,
    withToken,
    useBackendUrl,
    payload,
    method: 'put'
  }

  const response = await sendApiRequest(apiRequestOptions)
  return response.data
}

export async function sendDeleteRequest(
  url: string,
  payload?: object,
  options?: BaseRequestOptions
) {
  const { withToken = true, useBackendUrl = true } = options ?? {}

  const apiRequestOptions: ApiRequestOptions = {
    url,
    withToken,
    useBackendUrl,
    payload,
    method: 'delete'
  }

  const response = await sendApiRequest(apiRequestOptions)
  return response.data
}
