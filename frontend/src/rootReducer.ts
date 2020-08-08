import { combineReducers } from "redux";
import menuReducer from "./components/AddItemsInterface/ducks/reducer";

export default combineReducers({
  menuInfo: menuReducer,
});
