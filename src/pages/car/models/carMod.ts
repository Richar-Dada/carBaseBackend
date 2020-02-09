import { Effect } from 'dva';
import { Reducer } from 'redux';
import { message } from 'antd'

import { CarInfoType } from '../car'

import { 
  addCar,
  updateCar,
  queryCar,
  delCar
} from '../carServ';

export interface CurrentUser {
  name?: string;
}

export interface PaginationOptionType {
  pageSize: number,
  currentPage: number,
}

export interface TableOptionType {
  pageSize: number,
  current: number,
  total: number
}

export interface CarModelState {
  currentUser?: CurrentUser;
  name: string,
  formType: string,
  tableOption: TableOptionType
  cars: CarInfoType[],
  currentCar: CarInfoType
}

export interface CarModelType {
  namespace: 'carMod';
  state: CarModelState;
  effects: {
    addCar: Effect,
    editCar: Effect,
    fetchCar: Effect;
    delById: Effect;
  };
  reducers: {
    updateStore: Reducer<CarModelState>;
  };
}

const CarModel: CarModelType = {
  namespace: 'carMod',

  state: {
    currentUser: {},
    name: 'my car',
    formType: '',
    tableOption: {
      pageSize: 10,
      current: 1,
      total: 0
    },
    cars: [],
    currentCar: {}
  },

  effects: {
    *addCar(_, { call, put  }) {
      const params = {
        ..._.payload.carInfo, 
        source: 'backend'
      }
      console.log('ee', params)
      const response = yield call(addCar, params)
      if (response.code === '200') {
        message.success(`创建成功`)
        yield put({
          type: 'updateStore',
          payload: {
            formType: ''
          }
        })
        yield put({ type: 'fetchCar' })
      } else {
        message.error(response.msg || '未知错误')
      }
    },
    *editCar(_, { call, put, select }) {
      const { currentCar } = yield select((state: { carMod: CarModelState}) => state[CarModel.namespace])
      const params = {
        id: currentCar.id,
        ..._.payload.carInfo
      }
      console.log('ee', params)
      const response = yield call(updateCar, params)
      if (response.code === '200') {
        message.success(`修改成功`)
        yield put({
          type: 'updateStore',
          payload: {
            formType: '',
            currentCar: {}
          }
        })
        yield put({ type: 'fetchCar' })
      } else {
        message.error(response.msg || '未知错误')
      }
    },
    *fetchCar(_, { select, call, put }) {
      console.log('fetchCar')
      const { tableOption } = yield select((state: { carMod: CarModelState}) => state[CarModel.namespace])
      let params: PaginationOptionType = {
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
      const response = yield call(queryCar, params);
      yield put({
        type: 'updateStore',
        payload: {
          cars: response.data.list,
          tableOption: { 
            current: response.data.currentPage,
            pageSize: response.data.pageSize,
            total: response.data.count
          }
        }
      });
    },
    *delById(_, { call, put }) {
      const id = _.payload.id
      if (!id) {
        message.error('id不能为空')
        return
      }
      const response = yield call(delCar, id)
      if (response.code === '200') {
        message.success(`删除成功`)
        yield put({ type: 'fetchCar' })
      } else {
        message.error(response.msg || '未知错误')
      }
    }
  },

  reducers: {
    updateStore(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    }
  },
};

export default CarModel;
