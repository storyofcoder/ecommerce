import Constants from "./Constants";

const initialStateSchema = {
    items_list: [],
    items_list_loading: false,
    error: '',
};

let initialState = initialStateSchema;
const localData = localStorage.getItem("authToken");
if (localData && localData !== undefined) {
    try {
        initialState.authToken = localData;
    } catch (e) {
        initialState = initialStateSchema;
    }
}

const homeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case Constants.GET_ITEMS_LIST:
            newState = {
                ...state,
                items_list: [],
                items_list_loading: true,
            };
            return newState;

        case Constants.GET_ITEMS_LIST_SUCCESS:
            newState = {
                ...state,
                items_list: action.response,
                items_list_loading: false,
            };
            return newState;

        case Constants.GET_ITEMS_LIST_FAIL:
            newState = {
                ...state,
                error: action.response.data,
                items_list: [],
                items_list_loading: false,
            };
            return newState;


        default:
            return state;
    }
};

export default homeReducer;
