import request from '../request'
import { AxiosResponse } from 'axios'
import { ResponseData, PageData } from '@/types/api/public'
import { Camera } from '@/types/api/camera'

//type ConfigType<T=ResponseData<PageData>> = Promise<AxiosResponse<T>>

export const getCameras = (params: any): Promise<AxiosResponse<ResponseData<PageData<Camera>>>> => {
  return request({
    url: '/camera',
    method: 'get',
    params
  })
}