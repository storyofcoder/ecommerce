import { call, put, takeEvery } from "redux-saga/effects";
import Constants from "./Constants";
import {
  getItemsList
} from "../../apis/get/Index";


//Auth APIS
// generator function
function* _getItemsList(action) {
  try {
    const response = yield call(getItemsList, action.payload);
    yield put({
      type: Constants.GET_ITEMS_LIST_SUCCESS,
      response: response.data
    });
  } catch (e) {
    yield put({ type: Constants.GET_ITEMS_LIST_FAIL, response: e.response });
  }
}

export function* Home() {
  yield takeEvery(Constants.GET_ITEMS_LIST, _getItemsList);
}
