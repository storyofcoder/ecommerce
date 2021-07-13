import Constants from "./Constants";

const initialStateSchema = {
    menu_list: [],
    menu_list_loading: false,
    offers_list: [],
    offers_list_loading: false,
    bannerList: [],
    bannerListLoading: false,
    todayDealsList: [],
    todayDealsListLoading: false,
    productList: [],
    productListLoading: false,
    error: '',
};

let initialState = initialStateSchema;

const dashboardReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case Constants.GET_MENU_LIST:
            newState = {
                ...state,
                menu_list: [],
                menu_list_loading: true,
            };
            return newState;

        case Constants.GET_MENU_LIST_SUCCESS:
            newState = {
                ...state,
                menu_list: action.response.data,
                menu_list_loading: false,
            };
            return newState;

        case Constants.GET_MENU_LIST_FAIL:
            newState = {
                ...state,
                error: action.response.data,
                menu_list: [],
                menu_list_loading: false,
            };
            return newState;

        case Constants.GET_OFFERS_LIST:
            newState = {
                ...state,
                offers_list: [],
                offers_list_loading: true,
            };
            return newState;

        case Constants.GET_OFFERS_LIST_SUCCESS:
            newState = {
                ...state,
                offers_list: action.response,
                offers_list_loading: false,
            };
            return newState;

        case Constants.GET_OFFERS_LIST_FAIL:
            newState = {
                ...state,
                error: action.response.data,
                offers_list: [],
                offers_list_loading: false,
            };
            return newState;

        case Constants.GET_BANNER_LIST:
            newState = {
                ...state,
                bannerList: [],
                bannerListLoading: true,
            };
            return newState;

        case Constants.GET_BANNER_LIST_SUCCESS:
            newState = {
                ...state,
                bannerList: action.response.data,
                bannerListLoading: false,
            };
            return newState;

        case Constants.GET_BANNER_LIST_FAIL:
            newState = {
                ...state,
                error: action.response.data,
                bannerListLoading: false,
            };
            return newState;

        case Constants.GET_TODAY_DEALS_LIST:
            newState = {
                ...state,
                todayDealsList: [],
                todayDealsListLoading: true,
            };
            return newState;

        case Constants.GET_TODAY_DEALS_LIST_SUCCESS:
            newState = {
                ...state,
                todayDealsList: action.response.data,
                todayDealsListLoading: false,
            };
            return newState;

        case Constants.GET_TODAY_DEALS_LIST_FAIL:
            newState = {
                ...state,
                error: action.response.data,
                todayDealsList: [],
                todayDealsListLoading: false,
            };
            return newState;


        case Constants.GET_PRODUCT_LIST:
            newState = {
                ...state,
                productList: [],
                productListLoading: true,
            };
            return newState;

        case Constants.GET_PRODUCT_LIST_SUCCESS:
            newState = {
                ...state,
                productList: action.response.data,
                productListLoading: false,
            };
            return newState;

        case Constants.GET_PRODUCT_LIST_FAIL:
            newState = {
                ...state,
                error: action.response.data,
                productListLoading: false,
            };
            return newState;


        default:
            return state;
    }
};

export default dashboardReducer;
