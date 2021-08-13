export default function friendsAndWannabesReducer(state = [], action) {
    if (action.type == "friends/list") {
        state = action.payload.data;
    }

    if (action.type == "friends/accepted") {
        state = action.payload.data;
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
    return {
        type: "friends/accept",
        payload: { id },
    };
}

export function unfriend(id) {
    return {
        type: "friends/unfriended",
        payload: { id },
    };
}
