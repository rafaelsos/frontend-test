import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { UserTypes, User } from './types';
import { loadUserSuccess, loadUserFailure } from './actions';

interface IResponse {
  data: User[];
}

function* loadRequest() {
  try {
    const response: IResponse = yield call(api.get, '/users');

    const data = response.data.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));

    yield put(loadUserSuccess(data));
  } catch (error) {
    yield put(loadUserFailure());
  }
}

export default all([takeLatest(UserTypes.LOAD_USER_REQUEST, loadRequest)]);
