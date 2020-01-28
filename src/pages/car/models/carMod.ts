import { Effect } from 'dva';
import { Reducer } from 'redux';

import { queryCurrent, query as queryUsers } from '@/services/user';

export interface CurrentUser {
  name?: string;
}

export interface CarModelState {
  currentUser?: CurrentUser;
  name: string,
  isFormShow: boolean
}

export interface CarModelType {
  namespace: 'carMod';
  state: CarModelState;
  effects: {
    fetch: Effect;
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
    isFormShow: false
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
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
