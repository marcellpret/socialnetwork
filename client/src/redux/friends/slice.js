export default function friendsAndWannabesReducer(state = [], action) {
    if (action.type == "friends/list") {
        state = action.payload.data;
    }

    if (action.type == "friends/accept") {
        state = state.map((friend) => {
            if (friend.id == action.payload.id) {
                return { ...friend, accepted: true };
            }
        });
    }

    if (action.type == "friends/unfriended") {
        state = state.filter((friend) => {
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
