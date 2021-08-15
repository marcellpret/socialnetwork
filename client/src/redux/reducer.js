import { combineReducers } from "redux";
import friendsAndWannabesReducer from "./friends/slice";
import friendshipReducer from "./friendship/slice";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsAndWannabesReducer,
    friendship: friendshipReducer,
});

export default rootReducer;
