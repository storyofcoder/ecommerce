import { call, put, takeEvery } from "redux-saga/effects";
import Constants from "./Constants";
import {
  getMenuList,
  getOffersList,
  getbanner,
  getTodayDeals,
  getProductList
} from "../../apis/get/Index";


//Auth APIS
// generator function
function* _getMenuList(action) {
  try {
    const response = yield call(getMenuList, action.payload);
    yield put({
      type: Constants.GET_MENU_LIST_SUCCESS,
      response: response.data
    });
  } catch (e) {
    yield put({ type: Constants.GET_MENU_LIST_FAIL, response: e.response });
  }
}

function* _getOffersList(action) {
  try {
    const response = yield call(getOffersList, action.payload);
    yield put({
      type: Constants.GET_OFFERS_LIST_SUCCESS,
      response: response.data
    });
  } catch (e) {
    yield put({ type: Constants.GET_OFFERS_LIST_FAIL, response: e.response });
  }
}

function* _getbanner(action) {
  try {
    const response = yield call(getbanner, action.payload);
    yield put({
      type: Constants.GET_BANNER_LIST_SUCCESS,
      response: response.data
    });
  } catch (e) {
    yield put({ type: Constants.GET_BANNER_LIST_FAIL, response: e.response });
  }
}

function* _getTodayDeals(action) {
  try {
    const response = yield call(getTodayDeals, action.payload);
    yield put({
      type: Constants.GET_TODAY_DEALS_LIST_SUCCESS,
      response: response.data
    });
  } catch (e) {
    yield put({ type: Constants.GET_TODAY_DEALS_LIST_FAIL, response: e.response });
  }
}

function* _getProductList(action) {
  try {
    const response = yield call(getProductList, action.payload);
    yield put({
      type: Constants.GET_PRODUCT_LIST_SUCCESS,
      response: response.data
    });
  } catch (e) {
    yield put({ type: Constants.GET_PRODUCT_LIST_FAIL, response: e.response });
  }
}

export function* Dashboard() {
  yield takeEvery(Constants.GET_OFFERS_LIST, _getOffersList);
  yield takeEvery(Constants.GET_MENU_LIST, _getMenuList);
  yield takeEvery(Constants.GET_BANNER_LIST, _getbanner);
  yield takeEvery(Constants.GET_TODAY_DEALS_LIST, _getTodayDeals);
  yield takeEvery(Constants.GET_PRODUCT_LIST, _getProductList);
}
