import { call, put, takeEvery } from "redux-saga/effects";
import Constants from "./Constants";

import {
  auth,
  getWishlist,
  getCart
} from "../../apis/get/Index";

function* _auth(action) {
  try {
    const response = yield call(auth, action.payload);
    yield put({
      type: Constants.AUTH_SUCCESS,
      response: response.data
    });
  } catch (e) {
    yield put({ type: Constants.AUTH_FAIL, response: e.response });
  }
}

function* _getWishlist(action) {
  try {
    const response = yield call(getWishlist, action.payload);
    yield put({
      type: Constants.GET_USER_WISHLIST_SUCCESS,
      response: response.data
    });
  } catch (e) {
    yield put({ type: Constants.GET_USER_WISHLIST_FAIL, response: e.response });
  }
}

function* _getCart(action) {
  try {
    const response = yield call(getCart, action.payload);
    yield put({
      type: Constants.GET_USER_CART_SUCCESS,
      response: response.data
    });
  } catch (e) {
    yield put({ type: Constants.GET_USER_CART_FAIL, response: e.response });
  }
}

function* _modifyWishlist(action) {
  try {
    const response = action.payload;
    yield put({
      type: Constants.MODIFIY_WISHLIST_SUCCESS,
      response: response
    });
  } catch (e) {
    yield put({ type: Constants.MODIFIY_WISHLIST_FAIL, response: e.response });
  }
}

export function* User() {
  yield takeEvery(Constants.AUTH, _auth);
  yield takeEvery(Constants.GET_USER_WISHLIST, _getWishlist);
  yield takeEvery(Constants.GET_USER_CART, _getCart);
  yield takeEvery(Constants.MODIFIY_WISHLIST, _modifyWishlist);
}
