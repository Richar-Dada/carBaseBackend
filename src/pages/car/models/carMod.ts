import { Effect } from 'dva';
import { Reducer } from 'redux';
import { message } from 'antd'

import { 
  addCar,
  queryCar
} from '../carServ';

export interface CurrentUser {
  name?: string;
}

export interface TableOptionType {
  pageSize: number,
  currentPage: number
}

export interface CarType {
  id: number,
  pid: string,
  carType: string,
  regDate: string,
  licenceAddress: string,
  gearBox: string,
  effluentStandard: string,
  outputVolume: string,
  mileage: string,
  price: number,
  describe?: string,
  thumbnail: string,
  images: string
}

export interface CarModelState {
  currentUser?: CurrentUser;
  name: string,
  formType: string,
  tableOption: TableOptionType
  cars: CarType[]
}

export interface CarModelType {
  namespace: 'carMod';
  state: CarModelState;
  effects: {
    addCar: Effect,
    fetchCar: Effect;
    fetchCurrent: Effect;
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
      currentPage: 1
    },
    cars: []
  },

  effects: {
    *addCar(_, { call, put  }) {
      const params = {..._.payload.addInfo}
      console.log('ee', params)
      const response = yield call(addCar, params)
      if (response.code === '200') {
        message.success(`创建成功`)
      } else {
        message.error(response.msg || '未知错误')
      }
    },
    *fetchCar(_, { select, call, put }) {
      const { tableOption } = yield select((state: { carMod: CarModelState}) => state[CarModel.namespace])
      const params: TableOptionType = {...tableOption}
      const response = yield call(queryCar, params);
      yield put({
        type: 'updateStore',
        payload: {
          cars: response.data.list
        }
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
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
