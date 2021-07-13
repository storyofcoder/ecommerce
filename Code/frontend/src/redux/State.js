import { combineReducers } from "redux";
import home from "./home/Reducer";
import dashboard from "./dashboard/Reducer";
import header from "./header/Reducer";
import user from "./user/Reducer";

export default combineReducers({
    home: home,
    header: header,
    dashboard: dashboard,
    user: user,
});
