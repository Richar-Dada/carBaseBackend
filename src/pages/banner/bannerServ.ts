import request from '@/utils/request'

interface CreateParams {
    target: string
    imageUrl: string
    title: string
}

interface QueryParams {
    currentPage: number,
    pageSize: number
}

interface UpdateParams {
    id: string,
    target: string
    imageUrl: string
    title: string
}

/*
* 创建人员记录
*/
export async function add(params: CreateParams): Promise<any> {
    return request('/api/v1/banners', {
        method: 'POST',
        data: params,
    })
}

/*
* 查询人员记录
*/
export async function query(params: QueryParams): Promise<any> {
    return request('/api/v1/banners', {
        method: 'GET',
        params: params,
    })
}

/*
* 删除人员记录
*/
export async function del(id: string): Promise<any> {
    return request('/api/v1/banners/' + id, {
        method: 'DELETE',
    })
}

/*
* 根据ID查询人员记录
*/
export async function queryById(id: string): Promise<any> {
    return request('/api/v1/banners/' + id, {
        method: 'GET',
    })
}

/*
* 根据ID更新人员记录
*/
export async function update(params: UpdateParams): Promise<any> {
    return request('/api/v1/banners/' + params.id, {
        method: 'PUT',
        data: params,
    })
}