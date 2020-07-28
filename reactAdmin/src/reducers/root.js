import { combineReducers } from "redux";
import sidebarReducer from "./sidebar";
import loginReducer from "./login";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  login: loginReducer,
});

export default rootReducer;
