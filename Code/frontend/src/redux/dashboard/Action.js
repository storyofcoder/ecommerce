import Constants from "./Constants";

export const getMenuList = data => ({
  type: Constants.GET_MENU_LIST,
  payload: data
});

export const getOffersList = data => ({
  type: Constants.GET_OFFERS_LIST,
  payload: data
});

export const getbanner = data => ({
  type: Constants.GET_BANNER_LIST,
  payload: data
});

export const getTodayDeals = data => ({
  type: Constants.GET_TODAY_DEALS_LIST,
  payload: data
});

export const getProductList = data => ({
  type: Constants.GET_PRODUCT_LIST,
  payload: data
});