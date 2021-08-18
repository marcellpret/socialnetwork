import { combineReducers } from "redux";
import friendsAndWannabesReducer from "./friends/slice";
import friendshipReducer from "./friendship/slice";
import chatMessagesReducer from "./messages/slice";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsAndWannabesReducer,
    friendship: friendshipReducer,
    chatMessages: chatMessagesReducer,
});

export default rootReducer;
