import { all, takeEvery, put, fork } from "redux-saga/effects";
import authActions from "./actions";
// import {
//   userLogin
// } from "services/auth";
// import { push } from "react-router-redux";

export function* loginRequest() {
  yield takeEvery(authActions.LOGIN_REQUEST, function*({ data }) {
    try {
      console.log('loginRequest done')
      //   let response = yield userLogin({
      //     email: data.email,
      //     password: data.password
      //   });
      //   if (response.status === 200 || response.status === 201) {
      //     const { data } = response.data;
      //     yield put({
      //       type: authActions.LOGIN_SUCCESS,
      //       token: data.token,
      //     });
      //     yield put(push("/documents"))
      //   } else {
      //     throw response;
      //   }
      yield put({
        type: authActions.LOGIN_SUCCESS,
        token: 'DEMO TOKEN',
      });
    } catch (e) {
      yield put({
        type: authActions.AUTH_ERROR
      });
    }
  });
}

export default function* authSagas() {
  yield all([
    fork(loginRequest)
  ]);
}
