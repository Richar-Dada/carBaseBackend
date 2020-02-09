import { Effect } from 'dva'
import { Reducer } from 'redux'
import { message } from 'antd'

import { PeopleState, PeopleAttribute } from '../people'
import { addPeople, queryPeople, delPeople, queryPeopleById, updatePeople } from '../peopleServ'
import { PaginationOption } from '../people'
import { formatPlural } from '../../../../node_modules/umi-plugin-locale';

export interface PeopleModel {
    namespace: 'peopleMod';
    state: PeopleState;
    effects: {
        add: Effect,
        edit: Effect,
        fetch: Effect,
        delById: Effect,
        fetchById: Effect
    };
    reducers: {
        updateStore: Reducer<PeopleState>;
    };
}

const peopleModel: PeopleModel = {
    namespace: 'peopleMod',
    state: {
        peoples: [],
        tableOption: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        current: {}
    },
    effects: {
        *add(_, { call, put }) {
            const peopleAttribute: PeopleAttribute = _.payload.peopleAttribute
            const params = {
                name: peopleAttribute.name,
                password: peopleAttribute.password,
                phone: peopleAttribute.phone,
                role: peopleAttribute.role,
                source: 'backend'
            }
            console.log('ee', params)
            const response = yield call(addPeople, params)
            if (response.code === '200') {
                message.success(`创建成功`)
                _.callback && _.callback()
            } else {
                message.error(response.msg || '未知错误')
            }
        },
        *edit(_, { call, put, select }) {
            const { current } = yield select((state: { carMod: PeopleState }) => state[peopleModel.namespace])
            const params = {
                id: current.id,
                ..._.payload.peopleAttribute
            }
            console.log('ee', params)
            const response = yield call(updatePeople, params)
            if (response.code === '200') {
                message.success(`修改成功`)
                _.callback && _.callback()
            } else {
                message.error(response.msg || '未知错误')
            }
        },
        *fetch(_, { call, put, select }) {
            const { tableOption } = yield select((state: { peopleModel: PeopleModel }) => state[peopleModel.namespace])
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
            const response = yield call(queryPeople, params);
            yield put({
                type: 'updateStore',
                payload: {
                    peoples: response.data.list,
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
            const response = yield call(queryPeopleById, id)
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
            const response = yield call(delPeople, id)
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

export default peopleModel