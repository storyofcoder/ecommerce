import API from "../ApiConstants";
import axios from "axios";
import MenuList from "../../dummyData/dashboard/MenuList.json";
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

function serialize( obj ) {
  if(!obj) return '';
  let str = '?' + Object.keys(obj).reduce(function(a, k){
      a.push(k + '=' + encodeURIComponent(obj[k]));
      return a;
  }, []).join('&');
  return str;
}

export async function getItemsList() {
  const response = await axios.get("https://fakestoreapi.com/products").then(res => res);
  return response;
}

export async function getMenuList() {
  const response = await API.get("/public/dashboard-menu").then(res => res);
  return response;
}

export async function getTodayDeals(object) {
  let query = serialize(object);
  const response = await API.get("/public/best-deals" + query).then(res => res);
  return response;
}

export async function getbanner() {
  const response = await API.get("/public/dashboard-carousel").then(res => res);
  return response;
}

export async function getProductList(object) {
  let query = serialize(object);
  const response = await API.get("/public/product-list" + query).then(res => res);
  return response;
}

export async function getProduct(object) {
  let query = serialize(object);
  const response = await API.get("/public/product" + query).then(res => res);
  return response;
}

export async function getOffersList() {
  return {
    data: [{
      image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,h=267/layout-engine/2021-03/HFS-masthead_static1_1.jpg"
    }]
  };
}

export async function setAuth(address) {
  const response = await API.get("/auth/" + address).then(res => res);
  return response;
}

export async function confirmAuth(data) {
  const response = await API.post("/auth/confirm-auth", data).then(res => res);
  return response;
}

export async function auth(data) {
  const accessToken = localStorage.getItem('accessToken')
  API.defaults.headers.common['Authorization'] = accessToken;
  const response = await API.get("/auth/", data).then(res => res);
  return response;
}

export async function getWishlist() {
  const response = await API.get("/user/get-wishlist").then(res => res);
  return response;
}

export async function getCart() {
  const response = await API.get("/user/get-cart").then(res => res);
  return response;
}

export async function getSmiliarProducts(object) {
  const response = await API.post("/public/related-products", object).then(res => res);
  return response;
}

export async function searchProduct(query) {
  const response = await API.get(`/public/search?query=${query}`).then(res => res);
  return response;
}

export async function subscribe(query) {
  const response = await API.get(`/public/subscribe?email=${query}`).then(res => res);
  return response;
}