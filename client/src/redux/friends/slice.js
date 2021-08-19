import axios from "axios";

export default function friendsAndWannabesReducer(state = [], action) {
    if (action.type == "friends/list") {
        return action.payload.data;
    }

    if (action.type === "friends/accept") {
        return state.map((friend) => {
            if (friend.id == action.payload.otherUserId) {
                return { ...friend, accepted: true };
            } else {
                return friend;
            }
        });
    }

    if (action.type === "friends/unfriended") {
        return state.filter((friend) => {
            return friend.id != action.payload.otherUserId;
        });
    }

    if (action.type === "friends/add") {
        return [...state, action.payload.data];
    }

    return state;
}

export function friendsAndWannabes(data) {
    return {
        type: "friends/list",
        payload: { data },
    };
}

export function acceptFriendRequest(id, otherUserId, buttonText) {
    return async (dispatch) => {
        const { data } = await axios.post("/friendship", {
            id,
            buttonText,
        });
        dispatch({
            type: "friends/accept",
            payload: { otherUserId },
        });
    };

    // return {
    //     type: "friends/accept",
    //     payload: { id },
    // };
}

export function unfriend(id, otherUserId, buttonText) {
    return async (dispatch) => {
        const { data } = await axios.post("/friendship", { id, buttonText });
        dispatch({
            type: "friends/unfriended",
            payload: { otherUserId },
        });
    };
}

export function addFriend(otherUserId, buttonText) {
    return async (dispatch) => {
        const { data } = await axios.post("/friendship", {
            otherUserId,
            buttonText,
        });
        dispatch({
            type: "friends/add",
            payload: { data },
        });
    };
}
