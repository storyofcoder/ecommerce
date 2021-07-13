import Constants from "./Constants";

const initialStateSchema = {
    isAuthLoading: false,
    user: null,
    wishlist: {},
    wishlistLoading: false,
    wishlistObj: {},
    cartObj: {},
    cartList: {},
    cartLoading: false,
    error: '',
};

let initialState = initialStateSchema;

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case Constants.AUTH:
            newState = {
                ...state,
                isAuthLoading: true,
            };
            return newState;

        case Constants.AUTH_SUCCESS:
            let wish_array = action?.response?.data?.wishlist || [];
            let wish_obj = {};
            for (let i = 0; i < wish_array.length; i++)
                wish_obj[wish_array[i]] = true;
            let cary_array = action?.response?.data?.cart || [];
            let cart_obj = {};
            for (let i = 0; i < wish_array.length; i++)
                cart_obj[cary_array[i]] = true;

            newState = {
                ...state,
                isAuthLoading: false,
                user: action?.response?.data,
                wishlistObj: wish_obj,
                cartObj: cart_obj
            };
            return newState;

        case Constants.AUTH_FAIL:
            localStorage.removeItem("accessToken");
            newState = {
                ...state,
                isAuthLoading: false,
                error: action.response,
            };
            return newState;

        case Constants.GET_USER_WISHLIST:
            newState = {
                ...state,
                wishlistLoading: true,
            };
            return newState;

        case Constants.GET_USER_WISHLIST_SUCCESS:
            let obj2 = {};
            for (let i = 0; i < action?.response?.data?.length; i++) {
                obj2[action?.response?.data[i].asin] = action?.response?.data[i];
            }
            newState = {
                ...state,
                wishlist: obj2,
                wishlistLoading: false
            };
            return newState;

        case Constants.GET_USER_WISHLIST_FAIL:
            newState = {
                ...state,
                error: action.response,
                wishlistLoading: false
            };
            return newState;

        case Constants.MODIFIY_WISHLIST_SUCCESS:
            let updated_wishlist = { ...state.wishlistObj };
            if (action.response.type == 'add') updated_wishlist[action.response.id] = true;
            else delete updated_wishlist[action.response.id];
            newState = {
                ...state,
                wishlistObj: { ...updated_wishlist },
            };
            return newState;

        case Constants.GET_USER_CART:
            newState = {
                ...state,
                cartLoading: true,
            };
            return newState

        case Constants.GET_USER_CART_SUCCESS:
            let obj = {};
            for (let i = 0; i < action?.response?.data?.length; i++) {
                obj[action?.response?.data[i].asin] = action?.response?.data[i];
            }
            newState = {
                ...state,
                cartList: obj,
                cartLoading: false,
            };
            return newState;

        case Constants.GET_USER_CART_FAIL:
            newState = {
                ...state,
                error: action.response,
                cartLoading: false
            };
            return newState;

        default:
            return state;
    }
};

export default userReducer;
