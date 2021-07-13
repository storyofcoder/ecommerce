import Constants from "./Constants";

const initialStateSchema = {
    authDialogOpen: false,
    error: '',
};

let initialState = initialStateSchema;

const headerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case Constants.SET_AUTH_DIALOG_SUCCESS:
            newState = {
                ...state,
                authDialogOpen: action.response,
            };
            return newState;

        default:
            return state;
    }
};

export default headerReducer;
