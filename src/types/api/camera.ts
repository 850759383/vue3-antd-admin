import { ResponseData } from './public'

export interface TableList extends ResponseData {
  total: number,
  current: number,
  pageSize: number,
  data: []
}

export interface Camera {
    id: number,
    cameraName: string,
    deviceCode: string,
    adress: string,
    lat: number,
    lng: number
}