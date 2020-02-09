import request from '@/utils/request'

interface CreateParamsType {
    carType: string,
    regDate: string,
    licenceAddress: string,
    gearBox: string,
    effluentStandard: string,
    outputVolume: string,
    mileage: string,
    price: string,
    description: string,
    thumbnail: string,
    images: string,
}

interface QueryParamsType {
    currentPage: number,
    pageSize: number
}

interface UpdateParamsType {
    id: string,
    carType?: string,
    regDate?: string,
    licenceAddress?: string,
    gearBox?: string,
    effluentStandard?: string,
    outputVolume?: string,
    mileage?: string,
    price?: string,
    description?: string,
    thumbnail?: string,
    images?: string,
}

/*
* 创建车辆记录
*/
export async function addCar(params: CreateParamsType): Promise<any> {
    return request('/api/v1/cars', {
      method: 'POST',
      data: params,
    })
}
  
/*
* 查询车辆记录
*/
export async function queryCar(params: QueryParamsType): Promise<any> {
    console.log('params', params)
    return request('/api/v1/cars', {
      method: 'GET',
      params: params,
    })
}

/*
* 删除车辆记录
*/
export async function delCar(id: string): Promise<any> {
    return request('/api/v1/cars/' + id, {
      method: 'DELETE',
    })
}

/*
* 根据ID查询车辆记录
*/
export async function queryCarById(id: string): Promise<any> {
    return request('/api/v1/cars/' + id, {
      method: 'GET',
    })
}

/*
* 根据ID更新车辆记录
*/
export async function updateCar(params: UpdateParamsType): Promise<any> {
    return request('/api/v1/cars/' + params.id, {
      method: 'PUT',
      data: params,
    })
}