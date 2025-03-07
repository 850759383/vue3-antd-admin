import { App } from 'vue'
import storage from 'store'
import router from '@/router'
import { regAxios } from './install'
import { message } from 'ant-design-vue'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'


// 创建axios实例

const request = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL as string,
  timeout: 6000
})

/**
 * @desc: 异常拦截处理器
 * @param { Object } error 错误信息
 */
const errorHandler = (error: AxiosError): AxiosError | Promise<AxiosError> => {
  if(error.response == null) {
    message.error(error.message)
    return Promise.reject(error)
  }
  if (error.response.status == 401) {
    storage.remove('token')
    message.error(error.message)
    router.push({ path: '/login', query: { redirect: router.currentRoute.value.fullPath } })
    return Promise.reject(error)
  } else {
    message.error(error.message)
    return Promise.reject(error)
  }
  // } else if (error.response.status == 403) {    
  //   router.push({ path: '/403', query: { redirect: router.currentRoute.value.fullPath } })
  //   return Promise.reject(error)
  // } else if (error.response.status == 404) {    
  //   router.push({ path: '/404', query: { redirect: router.currentRoute.value.fullPath } })
  //   return Promise.reject(error)
  // } else if (error.response.status == 500) {    
  //   router.push({ path: '/500', query: { redirect: router.currentRoute.value.fullPath } })
  //   return Promise.reject(error)
  // } else {
  //   message.error(error.message)
  //   return Promise.reject(error)
  // }
 
}

/**
 * @desc: 请求发送前拦截
 * @param { Object } config 配置参数
 */
request.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers['Authorization'] = storage.get('token') ? `Bearer ${storage.get('token')}` : ''
  return config
}, errorHandler)


/**
 * @desc: 服务端响应后拦截
 * @param { Object } response 返回的数据
 */
request.interceptors.response.use((response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
  return response
  // if (response.data.code === 200) {
  //   return response
  // } else if (response.data.code === -401) {
  //   // 登录失效
  //   storage.remove('token')
  //   router.push({ path: '/login', query: { redirect: router.currentRoute.value.fullPath } })
  //   return Promise.reject(response)
  // } else {
  //   return Promise.reject(response)
  // }
}, errorHandler)

export const globalAxios = {
  install (app: App) {
    app.use(regAxios, request)
  }
}

export default request