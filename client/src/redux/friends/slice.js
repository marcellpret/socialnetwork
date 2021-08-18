import axios from "axios";

export default function friendsAndWannabesReducer(state = [], action) {
    if (action.type == "friends/list") {
        return action.payload.data;
    }

    if (action.type === "friends/accept") {
        return state.map((friend) => {
            if (friend.id == action.payload.id) {
                return { ...friend, accepted: true };
            } else {
                return friend;
            }
        });
    }

    if (action.type === "friends/unfriended") {
        return state.filter((friend) => {
            return friend.id != action.payload.id;
        });
    }

    return state;
}

export function friendsAndWannabes(data) {
    return {
        type: "friends/list",
        payload: { data },
    };
}

export function acceptFriendRequest(id) {
    return async (dispatch) => {
        const { data } = await axios.post("/accept/friendship", { id });
        dispatch({
            type: "friends/accept",
            payload: { id },
        });
    };

    // return {
    //     type: "friends/accept",
    //     payload: { id },
    // };
}

export function unfriend(id) {
    return async (dispatch) => {
        const { data } = await axios.post("/end/friendship", { id });
        dispatch({
            type: "friends/unfriended",
            payload: { id },
        });
    };

    // return {
    //     type: "friends/unfriended",
    //     payload: { id },
    // };
}
