import Constants from "./Constants";

export const getItemsList = user => ({
  type: Constants.GET_ITEMS_LIST,
  payload: user
});
