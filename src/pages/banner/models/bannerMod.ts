import { Effect } from 'dva'
import { Reducer } from 'redux'
import { message } from 'antd'

import { BannerState, BannerAttribute } from '@/pages/banner/banner'
import { add, query, del, queryById, update } from '@/pages/banner/bannerServ'
import { PaginationOption } from '@/pages/banner/banner'

export interface BannerModel {
    namespace: 'bannerMod';
    state: BannerState;
    effects: {
        add: Effect,
        edit: Effect,
        fetch: Effect,
        delById: Effect,
        fetchById: Effect
    };
    reducers: {
        updateStore: Reducer<BannerState>;
    };
}

const bannerModel: BannerModel = {
    namespace: 'bannerMod',
    state: {
        banners: [],
        tableOption: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        current: {}
    },
    effects: {
        *add(_, { call, put }) {
            const bannerAttribute: BannerAttribute = _.payload.bannerAttribute
            const params = {
                title: bannerAttribute.title,
                imageUrl: bannerAttribute.imageUrl,
                target: bannerAttribute.target
            }
            console.log('ee', params)
            const response = yield call(add, params)
            if (response.code === '200') {
                message.success(`创建成功`)
                _.callback && _.callback()
            } else {
                message.error(response.msg || '未知错误')
            }
        },
        *edit(_, { call, put, select }) {
            const { current } = yield select((state: { bannerModel: BannerModel }) => state[bannerModel.namespace])
            const params = {
                id: current.id,
                ..._.payload.peopleAttribute
            }
            console.log('ee', params)
            const response = yield call(update, params)
            if (response.code === '200') {
                message.success(`修改成功`)
                _.callback && _.callback()
            } else {
                message.error(response.msg || '未知错误')
            }
        },
        *fetch(_, { call, put, select }) {
            const { tableOption } = yield select((state: { bannerModel: BannerModel }) => state[bannerModel.namespace])
            let params: PaginationOption = {
                currentPage: tableOption.current,
                pageSize: tableOption.pageSize
            }
            if (_.payload && _.payload.paginationOption) {
                const paginationOption = _.payload.paginationOption
                params = {
                    currentPage: paginationOption.current,
                    pageSize: paginationOption.pageSize
                }
            }
            const response = yield call(query, params);
            yield put({
                type: 'updateStore',
                payload: {
                    banners: response.data.list,
                    tableOption: {
                        current: response.data.currentPage,
                        pageSize: response.data.pageSize,
                        total: response.data.count
                    }
                }
            });
        },
        *fetchById(_, { call, put, select }) {
            const id = _.payload.id
            if (!id) {
                message.error('id不能为空')
                return
            }
            const response = yield call(queryById, id)
            if (response.code === '200') {
                _.callback && _.callback(response.data)
            } else {
                message.error(response.msg || '未知错误')
            }
        },
        *delById(_, { call, put, select }) {
            const id = _.payload.id
            if (!id) {
                message.error('id不能为空')
                return
            }
            const response = yield call(del, id)
            if (response.code === '200') {
                message.success(`删除成功`)
                yield put({ type: 'fetch' })
            } else {
                message.error(response.msg || '未知错误')
            }
        },
    },
    reducers: {
        updateStore(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        }
    }
}

export default bannerModel