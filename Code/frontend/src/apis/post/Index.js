import API from "../ApiConstants";
import axios from "axios";
// import apiURL from "../constants/apiConstants";

// const walletAPI = axios.create({
//   baseURL: apiURL.WALLET_URL,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// const tradingAPI = axios.create({
//   baseURL: apiURL.TRADING_URL,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

export async function loginWithEmail(user) {
  const response = await API.post("/auth/login", user).then(res => res);
  return response;
}

export async function addWishlist(data) {
  const response = await API.post("/user/add-wishlist", data).then(res => res);
  return response;
}

export async function deleteWishlist(data) {
  const response = await API.post("/user/delete-wishlist", data).then(res => res);
  return response;
}

export async function addCart(data) {
  const response = await API.post("/user/update-cart", data).then(res => res);
  return response;
}

export async function addAddress(data) {
  const response = await API.post("/user/add-address", data).then(res => res);
  return response;
}

export async function updateAddress(data) {
  const response = await API.post("/user/update-address", data).then(res => res);
  return response;
}

export async function createOrder(data) {
  const response = await API.post("/user/create-order", data).then(res => res);
  return response;
}

export async function capture(data) {
  const response = await API.post("/user/payment-capture", data).then(res => res);
  return response;
}

export async function orderHistory(data) {
  const response = await API.post("/user/order-history", data).then(res => res);
  return response;
}

export async function getProductList(data) {
  const response = await API.post("/public/product-list", data).then(res => res);
  return response;
}

export async function getViewedProducts(data) {
  const response = await API.post("/user/recent-viewed", data).then(res => res);
  return response;
}