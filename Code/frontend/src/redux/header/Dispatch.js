import { call, put, takeEvery } from "redux-saga/effects";
import Constants from "./Constants";
import {
  setAuthDialog,
} from "../../apis/internal/Index";

function* _setAuthDialog(action) {
  try {
    const response = yield call(setAuthDialog, action.payload);
    yield put({
      type: Constants.SET_AUTH_DIALOG_SUCCESS,
      response: response
    });
  } catch (e) {
    yield put({ type: Constants.SET_AUTH_DIALOG_FAIL, response: e.response });
  }
}

export function* Header() {
  yield takeEvery(Constants.SET_AUTH_DIALOG, _setAuthDialog);
}
