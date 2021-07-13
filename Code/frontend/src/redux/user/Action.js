import Constants from "./Constants";

export const getUser = data => ({
  type: Constants.GET_USER,
  payload: data
});

export const auth = data => ({
  type: Constants.AUTH,
  payload: data
});

export const getWishList = data => ({
  type: Constants.GET_USER_WISHLIST,
  payload: data
});

export const getCart = data => ({
  type: Constants.GET_USER_CART,
  payload: data
});

export const modifyWishlist = data => ({
  type: Constants.MODIFIY_WISHLIST,
  payload: data
});