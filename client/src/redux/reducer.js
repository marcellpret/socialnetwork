import { combineReducers } from "redux";
import friendsAndWannabesReducer from "./friends/slice";
import friendshipReducer from "./friendButton/slice";
import chatMessagesReducer from "./messages/slice";
import usersReducer from "./users/slice";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsAndWannabesReducer,
    friendship: friendshipReducer,
    chatMessages: chatMessagesReducer,
    users: usersReducer,
});

export default rootReducer;
