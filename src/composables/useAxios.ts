import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export const useAxios = async <T>(options: AxiosRequestConfig) => {
  if (!options.method) {
    options.method = 'GET'
  }

  options.url = 'https://rickandmortyapi.com' + options.url

  let axiosCall
  try {
    axiosCall = await axios<T>(options)
  } catch (e) {
    return undefined
  }

  return axiosCall
}
