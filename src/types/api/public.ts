export interface ResponseData<T = any> {
  code: number,
  message: string,
  data?: T
}

export interface PageData<T = any> {
  pageSize: number,
  pageCount: number,
  currentPage: number,
  data: Array<T>
}