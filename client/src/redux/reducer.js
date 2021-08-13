import { combineReducers } from "redux";
import friendsAndWannabesReducer from "./friends/slice";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsAndWannabesReducer,
});

export default rootReducer;
