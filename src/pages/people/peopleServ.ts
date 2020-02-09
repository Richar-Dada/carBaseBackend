import request from '@/utils/request'

interface CreateParams {
    peopleType: string,
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

interface QueryParams {
    currentPage: number,
    pageSize: number
}

interface UpdateParams {
    id: string,
    peopleType?: string,
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
* 创建人员记录
*/
export async function addPeople(params: CreateParams): Promise<any> {
    return request('/api/v1/users', {
        method: 'POST',
        data: params,
    })
}

/*
* 查询人员记录
*/
export async function queryPeople(params: QueryParams): Promise<any> {
    console.log('params', params)
    return request('/api/v1/users', {
        method: 'GET',
        params: params,
    })
}

/*
* 删除人员记录
*/
export async function delPeople(id: string): Promise<any> {
    return request('/api/v1/users/' + id, {
        method: 'DELETE',
    })
}

/*
* 根据ID查询人员记录
*/
export async function queryPeopleById(id: string): Promise<any> {
    return request('/api/v1/users/' + id, {
        method: 'GET',
    })
}

/*
* 根据ID更新人员记录
*/
export async function updatePeople(params: UpdateParams): Promise<any> {
    return request('/api/v1/users/' + params.id, {
        method: 'PUT',
        data: params,
    })
}