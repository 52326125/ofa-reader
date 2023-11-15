import { TOKEN } from '@/data/localStorage'
import axios, { type AxiosRequestConfig } from 'axios'

export interface ApiRequestOptions {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  url: string
  params?: object
  payload?: object
  useBackendUrl: boolean
  withToken: boolean
}

interface Token {
  token: string
  expired: number
}

const instance = axios.create()

export async function sendApiRequest(options: ApiRequestOptions) {
  const { method, params, payload, useBackendUrl, withToken, url } = options

  const config: AxiosRequestConfig = {
    method,
    url: useBackendUrl ? useBackendUrl + url : url
  }

  if (withToken) {
    const tokenObj: Token = JSON.parse(localStorage.getItem(TOKEN) ?? '{}')
    const { token } = tokenObj
    config.headers = {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }

  if (params) config.params = params
  if (payload) config.data = payload

  try {
    return await instance(config)
  } catch (error) {
    console.error(error)
    throw error
  }
}
